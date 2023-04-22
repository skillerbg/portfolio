import express from "express";
import cors from "cors";

import { PineconeClient } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { OpenAI } from "langchain/llms";
import { PineconeStore } from "langchain/vectorstores";
import { ChatOpenAI } from "langchain/chat_models";
import { HumanChatMessage, SystemChatMessage, AIChatMessage } from "langchain/schema";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.post("/ask", async (req, res) => {

  try {
    const gptModel="gpt-3.5-turbo";//Can change to gpt-4
    const chatArray = req.body.chat;
    const question = chatArray[chatArray.length - 1].content;
    const chat = new ChatOpenAI({
      temperature: 0,
      model: gptModel
    });

    
    const chatMessages1 = chatArray.map((message) => {
      switch (message.role) {
        case "assistant":
          return new AIChatMessage(message.content);
        case "user":
          return new HumanChatMessage(message.content);
        case "system":
          return new SystemChatMessage(message.content);
        default:
          return null;
      }
    });
    chatMessages1[chatMessages1.length-1]=new HumanChatMessage("Generate a natural langage query to search for information about this question: \""+question +"\" reply only with the query that you think will be useful to find information about this question. Don't say anything else.")

    const generationResponse1 = await chat.call(chatMessages1);
    console.log("query : "+generationResponse1.text);
  

    if (!question) {
      return res.status(400).send({ error: "Please provide a question." });
    }
    const client = new PineconeClient();
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex }
    );

    /* Search the vector DB independently with meta filters */
    // const results = await vectorStore.similaritySearch("pinecone", 1, {
    //   foo: "bar",
    // });
    // console.log(results);
    /*
    [
      Document {
        pageContent: 'pinecone is a vector db',
        metadata: { foo: 'bar' }
      }
    ]
    */

    /* Use as part of a chain (currently no metadata filters) */
    console.log(question);
    const model = new OpenAI();
    const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
      k: 3,
      returnSourceDocuments: true,
    });
    const retrievalResponse = await chain.call({ query: generationResponse1.text });
    // Create a chat model instance
   
    
    // Format the retrieved documents into messages
    const messages = retrievalResponse.sourceDocuments.map((doc) => (doc.pageContent
      ));

    // Pass the messages to the chat model along with the user question and instructions
    // const generationResponse = await chat.call([
    //   { content: "Answer the user's question using the retrieved documents.", role: "system" },
    //   { content: "What is a pinecone?", role: "user" },
    //   ...messages,
    // ]);
    //messages to string
    const string= messages.toString();

    const chatMessages = chatArray.map((message) => {
      switch (message.role) {
        case "assistant":
          return new AIChatMessage(message.content);
        case "user":
          return new HumanChatMessage(message.content);
        case "system":
          return new SystemChatMessage(message.content);
        default:
          return null;
      }
    });
    chatMessages.unshift(new SystemChatMessage(
      "You are Yonko Lozanov's Ai chatbot. Your task is to answer human's questions about Yonko Lozanov. You can only answer questions about him with the information you have. You have access his code. If the user asks for code snippet example, and the INFORMATION does't contain it, you must ask the user to narrow down what kind of snippet he want's to see. You only show code that is in INFORMATION. If you have multiple code snippets to chose from, you must chose the best code. You can't make things up about Yonko Lozanov.  INFORMATION: "+ string))
    console.log(messages);

    const generationResponse = await chat.call(chatMessages);

    console.log(generationResponse);
  

    res.json({
      answer: generationResponse.text,
      sourceDocuments: generationResponse.sourceDocuments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while processing your question." });
  }
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
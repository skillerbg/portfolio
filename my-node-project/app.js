import { PineconeClient } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { PineconeStore } from "langchain/vectorstores";
import fs from 'fs-extra';
import path from 'path';

dotenv.config();

const client = new PineconeClient();
await client.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});
const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

// const docs = [
//   new Document({
//     metadata: { source: "https://github.com/skillerbg/Nutrition" },
//     pageContent: `
//     example1
//    `,
    
//   }),
//   new Document({
//     metadata: { source: "https://github.com/skillerbg/Brands" },
//     pageContent: `
//   example2
//    `,
    
//   })
//   ,
//   new Document({
//     metadata: { source: "https://github.com/skillerbg/callgpt" },
//     pageContent: `
   
//    `,
    
//   }),
//   new Document({
//     metadata: { source: "https://github.com/skillerbg/SoftUni" },
//     pageContent:"example",
    
//   })



// ];


// await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
//   pineconeIndex,
// });



async function readProjectFolders(parentFolderPath) {
  const projectFolders = await fs.readdir(parentFolderPath);
  const docs = [];

  for (const projectFolder of projectFolders) {
    const projectFolderPath = path.join(parentFolderPath, projectFolder);
    const isDirectory = (await fs.stat(projectFolderPath)).isDirectory();

    if (isDirectory) {
      const sourceFilePath = path.join(projectFolderPath, 'source.txt');
      const sourceExists = await fs.pathExists(sourceFilePath);

      if (!sourceExists) {
        console.warn(`source.txt not found in ${projectFolder}`);
        continue;
      }

      const sourceUrl = await fs.readFile(sourceFilePath, 'utf-8');
      const files = await fs.readdir(projectFolderPath);

      for (const file of files) {
        if (file === 'source.txt') continue;

        const filePath = path.join(projectFolderPath, file);
        const isFile = (await fs.stat(filePath)).isFile();

        if (isFile) {
          const fileContent = await fs.readFile(filePath, 'utf-8');
          const header = `//Project: ${projectFolder}, File: ${file}\n`;
          const pageContent = `${header}${fileContent}`;

          docs.push(
            new Document({
              metadata: { source: sourceUrl.trim() },
              pageContent,
            })
          );
        }
      }
    }
  }

  return docs;
}
const parentFolderPath = './files'; // Replace with the path to your projects folder

async function main() {
  try {
    const docs = await readProjectFolders(parentFolderPath);
    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
      pineconeIndex,
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
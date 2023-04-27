import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [showChatboxElements, setShowChatboxElements] = useState(false);
  const [animation, setAnimation] = useState(false);
 

  const [messages, setMessages] = useState(() => {
    const storedMessages = window.sessionStorage.getItem('messages');
    if (storedMessages) {
      let parsedMessages = JSON.parse(storedMessages);
      // If the last message is from the user, remove it
      if (parsedMessages.length > 0 && parsedMessages[parsedMessages.length - 1].role === 'user') {
        parsedMessages.pop();
      }
      return parsedMessages.length > 0 ? parsedMessages : [
        { role: 'assistant', content: 'Welcome to Yonko Lozanov\'s website! I\'m his AI assistant. I can give you information about his skills, projects, education, or show you code snippets from his projects.' },
      ];
    } else {
      return [
        { role: 'assistant', content: 'Welcome to Yonko Lozanov\'s website! I\'m his AI assistant. I can give you information about his skills, projects, education, or show you code snippets from his projects.' },
      ];
    }
  });
  const inputRef = useRef(null);
  const chatMessagesRef = useRef(null);
  useEffect(() => {
    window.sessionStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    if (sessionStorage.getItem('Animation') === 'true') {
      setAnimation(true);
      console.log(animation);
    }
  }, []);

  useEffect(() => {

    if (!showChatboxElements) {
      setTimeout(() => {
        setShowChatboxElements(true);
        sessionStorage.setItem('Animation', true);

      }, 4000); // Set the delay here
    }
  }, []);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isLoading]);




  async function handleSubmit(event) {
    event.preventDefault();

    if (inputRef.current.value !== '') {
      console.log(messages);
      const input = inputRef.current.value;
      inputRef.current.value = '';

      const userMessage =
        { role: 'user', content: input }


      setMessages([...messages, userMessage]);
      //setIsLoading(true); with 1 second delay
      setTimeout(() => {
        setIsLoading(true);
      }, 1000);

      var formdata = new FormData();
      formdata.append("message", JSON.stringify([...messages, userMessage]));

      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chat: [...messages, userMessage] }),
        redirect: 'follow'
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/ask`, requestOptions);
      const result = await response.json();

      // Add the server's response message to the messages state variable
      const responseMessage = { role: 'assistant', content: result.answer };
      setIsLoading(false);
      setMessages([...messages, userMessage, responseMessage]);

      // Clear the input value using the ref

    }
  }



  const messageKeys = Object.keys(messages);

  function createTypingEffect(text) {
    const chars = text.split('');

    return chars.map((char, index) => (
      <span
        key={index}
        className={char === ' ' ? 'word-break' : 'typing-effect'}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {char === ' ' ? '\u00A0' : char === '\n' ? <br /> : char}
      </span>
    ));
  }





  function parseMessageContent(content) {
    const regex = /```([\s\S]*?)```/g;
    const parts = content.split(regex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <div>
            <code key={index} className="code-box">
              {part}

            </code>
            <br />
          </div>

        );
      } else {
        return part;
      }
    });
  }


  // Inside the return statement of Home component
  console.log("animation is " + animation + "");
  if (animation) {
    console.log("its true");
    return (
      <div className="pageContainer">


        <div className="chatContainervisible ">

          <div className="chatMessages" ref={chatMessagesRef}>
            {messageKeys.map((key) => (

              <div key={key} className={`message visible ${messages[key].role}`}>
                {messages[key].role === 'assistant' ? (
                  parseMessageContent(messages[key].content)
                ) : (
                  messages[key].content
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message assistant visible loading">
                <span className="typing-effect" style={{ animationDelay: "0.1s" }}>.</span>
                <span className="typing-effect" style={{ animationDelay: "0.2s" }}>.</span>
                <span className="typing-effect" style={{ animationDelay: "0.3s" }}>.</span>
              </div>
            )}
          </div>
          <form className="chatForm visible" onSubmit={handleSubmit}>
            <input type="text" placeholder="Type your message here..." ref={inputRef} />
            <button type="submit">Send</button>
          </form>
        </div>

      </div>
    );
  } else {
    return (
      <div className="pageContainer">


        <div className="chatContainer">

          <div className="chatMessages" ref={chatMessagesRef}>
            {messageKeys.map((key) => (

              <div key={key} className={`message  ${key !== '0' ? 'visible ' + messages[key].role : 'visible initialMessage'}`}>
                {messages.length == 1 ? createTypingEffect(messages[key].content) : messages[key].role === 'assistant' ? (
                  parseMessageContent(messages[key].content)
                ) : (
                  messages[key].content
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message assistant visible loading">
                <span className="typing-effect" style={{ animationDelay: "0.1s" }}>.</span>
                <span className="typing-effect" style={{ animationDelay: "0.2s" }}>.</span>
                <span className="typing-effect" style={{ animationDelay: "0.3s" }}>.</span>
              </div>
            )}
          </div>
          <form className={`chatForm ${showChatboxElements ? 'visible' : ''}`} onSubmit={handleSubmit}>
            <input type="text" placeholder="Type your message here..." ref={inputRef} />
            <button type="submit">Send</button>
          </form>
        </div>

      </div>
    );
  }




}





import React, { useLayoutEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import mockupResponses from '../json/mockupResponses';
import { BiBot } from 'react-icons/bi';
import ChatDownload from './ChatDownload';
import ChatBubbles from './ChatBubbles';
import ChatTypingLoader from './ChatTypingLoader';

const ChatMessageWindow = () => {
  const [messages, setMessages] = useState([]);
  const [userHasSentMessage, setUserHasSentMessage] = useState(false);
  const [botResponses, setBotResponses] = useState([]);
  const [loading, setLoading] = useState(false); // Initially set loading to false  
  
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useLayoutEffect( () => {
    scrollToBottom();
  }, [messages]);
  
  
  const handleSendMessage = (message) => {
    const userMessage = {
      text: message,
      timestamp: new Date().toLocaleTimeString(),
      isUser: true,
    };

    setMessages([...messages, userMessage]);
    setUserHasSentMessage(true);

    // Set loading to true to show the spinner
    setLoading(true);

    // Delay the bot's response by random seconds
    const randomDelay = Math.floor(Math.random() * 3000) + 2000; // Random delay between 2 and 5 seconds
    setTimeout(() => {
      const botResponse = {
        text: mockupResponses[Math.floor(Math.random() * mockupResponses.length)],
        timestamp: new Date().toLocaleTimeString(),
        isUser: false,
      };

      setBotResponses([...botResponses, botResponse]);

      // Set loading back to false after the response is generated
      setLoading(false);
      scrollToBottom();
    }, randomDelay); // 4 seconds delay
  };

  // use the flatMap function to iterate over the messages array along with its index. For each message, 
  // you return an array with the user message and the corresponding bot response (or null if there is no bot response at that index
  const combinedMessages = messages.flatMap((message, index) => [
    message,
    botResponses[index] || null,
  ]).filter(Boolean);

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">


      <div className='flex items-stretch'>
        <h1 className='font-bold' style={{ display: 'flex', alignItems: 'center' }}>
          <BiBot /> Chatbot Mockup
        </h1>
      </div>

      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">

        <ChatDownload messages={combinedMessages} />

        <ChatBubbles combinedMessages={combinedMessages} chatContainerRef={chatContainerRef} />

        <ChatTypingLoader loading={loading} />

        <ChatInput onSendMessage={handleSendMessage} />
        
      </div>
    </div>
  );
};

export default ChatMessageWindow;

import React, { useState } from 'react';
import ChatInput from './ChatInput';
import PulseLoader from 'react-spinners/PulseLoader';
import mockupResponses from '../json/mockupResponses';
import { BiBot } from 'react-icons/bi';

const ChatMessageWindow = () => {
  const [messages, setMessages] = useState([]);
  const [userHasSentMessage, setUserHasSentMessage] = useState(false);
  const [botResponses, setBotResponses] = useState([]);
  const [loading, setLoading] = useState(false); // Initially set loading to false
  
  const color = "#ffffff"
  
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
    <h1 className='font-bold' style={{ display: 'flex', alignItems: 'center' }}>
      <BiBot /> Chatbot Mockup
    </h1>
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {combinedMessages.map((message, index) => (
            <div
              className={`flex w-full max-w-xs ${
                message.isUser ? 'ml-auto justify-end' : ''
              }`}
              key={index}
            >
              <div>
                <div
                  className={`${
                    message.isUser
                      ? 'bg-blue-600 text-white rounded-l-lg rounded-br-lg p-3'
                      : 'bg-gray-300 rounded-lg p-3'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <span className="text-xs text-gray-500 leading-none">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {loading && ( // Show the spinner only when loading is true
          <div className='flex w-full max-w-xs'>
            <div className='bg-gray-300 rounded-lg p-3'>
              <p className="text-sm">
                <PulseLoader
                  color={color}
                  loading={loading}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </p>
            </div>
          </div>
        )}

        <div className="bg-gray-300 p-4">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatMessageWindow;

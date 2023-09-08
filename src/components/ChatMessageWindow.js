import React, { useState } from 'react';
import ChatInput from './ChatInput';

const ChatMessageWindow = () => {
  const [messages, setMessages] = useState([]);
  const [userHasSentMessage, setUserHasSentMessage] = useState(false);
  const [botResponses, setBotResponses] = useState([]);

  const mockupResponses = [
    'Hello!',
    'How can I assist you?',
    'Nice to chat with you!',
    'Sorry, I am a bot and cannot provide real-time responses.',
  ];

  const handleSendMessage = (message) => {
    // create a new message Object
    const userMessage = {
      text: message,
      timestamp: new Date().toLocaleTimeString(),
      isUser: true,
    };
    console.log('User Message sent', message);

    setMessages([...messages, userMessage]);
    setUserHasSentMessage(true);

    // Simulate a bot response with a predefined answer
    const botResponse = {
      text: mockupResponses[Math.floor(Math.random() * mockupResponses.length)],
      timestamp: new Date().toLocaleTimeString(),
      isUser: false, // Add a flag to identify bot responses
    };

    // Add the bot's response to the botResponses state
    setBotResponses([...botResponses, botResponse]);
  };

  const combinedMessages = messages.flatMap((message, index) => [
	message,
	botResponses[index] || null,
  ]);
  

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
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
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            </div>
          ))}
        </div>

        <div className="bg-gray-300 p-4">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatMessageWindow;

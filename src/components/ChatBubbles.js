const ChatBubbles = ({combinedMessages, chatContainerRef}) => {
    return (
          
        <div 
        className="flex flex-col flex-grow h-0 p-4 overflow-auto"
        ref={chatContainerRef}>
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
      );
}
 
export default ChatBubbles;
import { BiDownload } from 'react-icons/bi';

const ChatDownload = ( {messages} ) => {

    const exportChatHistory = () => {
    const plainText = messages
    .map((message) => `${message.timestamp} - ${message.isUser ? 'User' : 'Bot'}: ${message.text}`)
    .join('\n');

    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const downloadTime = new Date().toLocaleTimeString();
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-history_${downloadTime}.txt`;
    a.click();

    URL.revokeObjectURL(url);
    }
    

    return(
        <button
          onClick={exportChatHistory}
          className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-blue py-2 px-2 rounded mt-2"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <BiDownload /> Export Chat
        </button>
    )

};

export default ChatDownload;
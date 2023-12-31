import { useState } from 'react'; 
import { BiLogoTelegram } from "react-icons/bi";


const ChatInput = ({ onSendMessage }) => {
  
const [message, setMessage] = useState(''); 

const handleSubmit = (e) => {
    e.preventDefault(); 
    onSendMessage(message); 
    setMessage('')
}

    return ( 
        <div className="bg-gray-300 p-4">
            <form onSubmit={handleSubmit}>
                
                <div className="flex rounded-md shadow-sm">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:z-10 focus:ring-blue-500 white:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    />
                    <button 
                        type="submit" 
                        disabled={!message}
                        className={`py-3 px-4 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border font-semibold text-white text-sm
                                ${!message 
                                    ? 'bg-gray-500' 
                                    : 'bg-blue-500 hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                                }`}
                        >
                        <BiLogoTelegram />
                    </button>

                </div>
            </form> 
        </div>
    );
}
 
export default ChatInput;
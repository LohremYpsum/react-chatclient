import PulseLoader from 'react-spinners/PulseLoader';

const color = "#ffffff";

const ChatTypingLoader = ({loading}) => {
    return (
        <div> 
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
      </div>
     );
}
 
export default ChatTypingLoader;
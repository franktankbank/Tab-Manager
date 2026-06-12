import { useState } from 'react'

function Count() {
    const [message, setMessage] = useState('Calculate Total')

    return (
        <div className="p-8 w-full max-w-md bg-indigo-700 rounded-lg shadow-lg">
            <h3 className="text-slate-200 font-bold mb-4">Get Total Number of Open Tabs</h3>
            <button
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-200 font-semibold py-2 rounded"
                onClick={async () => {
                    const total = await chrome.runtime.sendMessage({
                        action: "START_COUNT"
                    });

                    setMessage(`Total open tabs: ${total}`)
                }}
            >
                {message}
            </button>
        </div>
    );
}

export default Count

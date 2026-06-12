import { useState } from "react";

function Dedupe() {
    const [message, setMessage] = useState('Close Duplicate Tabs')
    return (
        <div className="p-8 w-full max-w-md bg-indigo-700 rounded-lg shadow-lg">
            <h3 className="text-slate-200 font-bold mb-4">Close Duplicate Tabs</h3>
            <button
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-200 font-semibold py-2 rounded"
                onClick={async () => {
                    const count = await chrome.runtime.sendMessage({
                        action: "START_DEDUPE"
                    });

                    setMessage(`Closed ${count} Duplicate Tabs`)
                }}
            >
                {message}
            </button>
        </div>
    );
}

export default Dedupe

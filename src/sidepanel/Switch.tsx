import { useState } from "react";

function Switch() {
    const [index, setIndex] = useState(NaN)
    return (
        <div className="p-8 w-full max-w-md bg-indigo-700 rounded-lg shadow-lg">
            <h3 className="text-slate-200 font-bold mb-4">Switch to an Open Tab</h3>
            <input
                className="w-full bg-slate-200 text-slate-950 py-2 font-semibold text-center rounded"
                type="number"
                value={isNaN(index) ? "" : index }
                onChange={(e) => setIndex(e.target.valueAsNumber)}
            />
            <button
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-200 font-semibold py-2 rounded"
                onClick={() => {
                    if (!isNaN(index)) {
                        chrome.runtime.sendMessage({
                            action: "START_SWITCH",
                            index: index
                        });
                        setIndex(NaN);
                    }
                }}
            >
                Switch to a Tab by Its Index
            </button>
        </div>
    );
}

export default Switch

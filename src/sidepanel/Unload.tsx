
function Unload() {
    return (
        <div className="p-8 w-full max-w-md bg-indigo-700 rounded-lg shadow-lg">
            <h3 className="text-slate-200 font-bold mb-4">Unload Tabs That Are Not Currently Active</h3>
            <button
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-200 font-semibold py-2 rounded"
                onClick={() => {
                    chrome.runtime.sendMessage({
                        action: "START_UNLOAD"
                    });
                }}
            >
                Unload Inactive Tabs
            </button>
        </div>
    );
}

export default Unload

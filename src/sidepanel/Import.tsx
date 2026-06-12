function Import() {
    return (
        <div className="p-8 w-full max-w-md bg-indigo-700 rounded-lg shadow-lg">
            <h3 className="text-slate-200 font-bold mb-4">Import Tabs</h3>
            <button
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-200 font-semibold py-2 rounded"
                onClick={() => {
                    chrome.runtime.sendMessage({
                        action: "START_IMPORT"
                    });
                }}
            >
                Import Tabs From File
            </button>
        </div>
    );
}

export default Import

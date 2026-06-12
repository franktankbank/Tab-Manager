chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));

function exportTabs() {
    // Query all open tabs to get important info of the active tabs
    chrome.tabs.query({}, function (tabs) {
        // Extract URLs, indexes, titles, and favIcon urls from the tabs
        const tabData = tabs.map(function(tab) {
            var obj = {
                index: tab.index,
                title: tab.title,
                favIcon: tab.favIconUrl,
                url: tab.url
            };
            return obj;
        });

        // Convert the object into json
        const tabJson = JSON.stringify(tabData, null, 4);

        // Create a Blob with the data as text content
        const blob = new Blob([tabJson], { type: "application/json" });

        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result;
            // Use dataUrl with chrome.downloads.download
            chrome.downloads.download({
                url: dataUrl,
                filename: "exported_tabs.json",
                saveAs: true
            });
        };
        reader.readAsDataURL(blob);
    });
}

async function getTabCount() {
    const tabs = await chrome.tabs.query({});
    return tabs.length;
}

function unloadInactiveTabs() {
    chrome.tabs.query({}).then(tabs => {
        tabs.forEach(tab => {
            if (!tab.active && !tab.discarded) {
                chrome.tabs.discard(tab.id).catch(err => console.error(err));
            }
        });
    });
}

function CloseTabByIndex(index) {
    if (index == -1) {
        getTabCount().then(tabCount => {
            chrome.tabs.query({ index: (tabCount - 1) }).then(tabs => {
                if (tabs.length > 0) {
                    chrome.tabs.remove(tabs[0].id);
                }
            });
        });
    } else {
        chrome.tabs.query({ index: index }).then(tabs => {
            if (tabs.length > 0) {
                chrome.tabs.remove(tabs[0].id);
            }
        });
    }
}

function SwitchToTabByIndex(index) {
    if (index == -1) {
        getTabCount().then(tabCount => {
            chrome.tabs.query({ index: (tabCount - 1), active: false }).then(tabs => {
                if (tabs.length > 0) {
                    chrome.tabs.update(tabs[0].id, { active: true });
                }
            });
        });
    } else {
        chrome.tabs.query({ index: index, active: false }).then(tabs => {
            if (tabs.length > 0) {
                chrome.tabs.update(tabs[0].id, { active: true });
            }
        });
    }
}

async function DedupeTabs() {
    const tabs = await chrome.tabs.query({});
    const seen = new Map();
    let duplicates = [];
    let count = 0;

    for (const tab of tabs) {
        if (seen.has(tab.url)) {
            duplicates.push(tab.id);
            count++;
        } else {
            seen.set(tab.url, tab.id);
        }
    }

    duplicates.forEach(id => {
        chrome.tabs.remove(id);
    });

    return count;
}

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "START_EXPORT") {
        exportTabs();
    }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "START_COUNT") {
        // Return true to keep the message channel open for async response
        getTabCount().then(sendResponse);
        return true;
    }
});

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "START_UNLOAD") {
        unloadInactiveTabs();
    }
});

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "START_CLOSE" && msg.index) {
        CloseTabByIndex(msg.index);
    }
});

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "START_SWITCH" && !isNaN(msg.index)) {
        SwitchToTabByIndex(msg.index);
    }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "START_DEDUPE") {
        DedupeTabs().then(sendResponse);
        return true;
    }
});

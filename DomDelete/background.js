
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({ file: 'content.js' });
});

chrome.runtime.onMessage.addListener(function(msg) {
	if (msg.active) {
		chrome.browserAction.setIcon({ path: "domdelete48-active.png" });
		chrome.tabs.insertCSS({ code: "* { cursor: crosshair !important; }" });

	}
	else if (!msg.active) {
		chrome.browserAction.setIcon({ path: "domdelete48.png" });
		chrome.tabs.insertCSS({ code: "* { cursor: auto !important; }" });
	}
});

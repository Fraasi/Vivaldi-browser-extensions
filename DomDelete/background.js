
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({ file: 'content.js' });
});

chrome.runtime.onMessage.addListener(function(msg) {
	if (msg.active) {
		chrome.browserAction.setIcon({ path: "domdelete48-active.png" });
		chrome.tabs.insertCSS({ code: "body, a { cursor: crosshair; }" });
	}
	else if (!msg.active) {
		chrome.browserAction.setIcon({ path: "domdelete48.png" });
		chrome.tabs.insertCSS({ code: "body, a { cursor: auto; }" });
	}
});
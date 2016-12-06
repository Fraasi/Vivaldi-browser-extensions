function updateBadge(tabs) {
    chrome.browserAction.setBadgeText({
		text: String(tabs.length)
    });
}
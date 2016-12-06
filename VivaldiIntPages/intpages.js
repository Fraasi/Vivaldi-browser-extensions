 
 document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bookmarks').addEventListener('click', function() {
        chrome.tabs.create({ url: 'chrome://chrome/bookmarks' });
    });
});

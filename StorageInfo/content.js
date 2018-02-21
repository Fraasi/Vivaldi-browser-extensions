var localFail, sessionFail;
try {
    localStorage;
}
catch(err) {    
    localFail = { [err.name]: err.message };
}
try {
    sessionStorage;
}
catch(err) {
    sessionFail = { [err.name]: err.message };   
}
finally {
    chrome.runtime.sendMessage({
        localStorage: localFail || localStorage,
        sessionStorage: sessionFail || sessionStorage
    });
}


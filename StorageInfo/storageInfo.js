(function () {

	var divCookies = document.getElementById('cookies')
	var divlocal = document.getElementById('localstorage');
	var divSession = document.getElementById('sessionstorage');
	var divDomain = document.getElementById('domain');
	
	document.addEventListener('DOMContentLoaded', retrieveStorages, false);

	function retrieveStorages() {

		chrome.tabs.executeScript( {file: 'content.js'} );

		chrome.runtime.onMessage.addListener( function(msg, sender) {
			var session = Object.keys(msg.sessionStorage);			
			var local = Object.keys(msg.localStorage);

			divlocal.innerHTML += 
				`<br/><b>localStorage(${local.length}):</b><ul>${local.map((key) => {
					return `<li><b>key:</b> ${key}<br/><b>value</b>: ${msg.localStorage[key]}`;
				})}</ul>`.replace(/,/g, '');

			divSession.innerHTML += 
				`<br/><b>sessionStorage(${session.length}):</b><ul>${session.map((key) => {
					return `<li><b>key:</b> ${key}<br/><b>value:</b> ${msg.sessionStorage[key]}`;
				})}</ul>`.replace(/,/g, '');

		});

		chrome.tabs.query({ currentWindow: true, active: true }, (urlArr) => {
			var url = new URL(urlArr[0].url);
			var domain = /(?:www.)?(\w+\.\w+)/.exec(url.host)[1];
			divDomain.innerHTML = `Storage info for<br/>${domain}`;
			chrome.cookies.getAll({}, function (cookies) {
				var filtered = cookies.filter( cookie => cookie.domain.includes(domain));
				divCookies.innerHTML += `<br/><b>Cookies(${filtered.length}):</b><ul>
				${filtered.map( cookie => {
					return `<li><b>key:</b> ${cookie.name}<br/><b>value:</b> ${cookie.value}</li>`;
				})}</ul>`.replace(/,/g, '');
			})
		})
	}
})();
// 'on_load_counter'

document.onreadystatechange = function(){
     if(document.readyState === 'complete'){
	 retrievestate();
	 badge();
}}; 

document.getElementById('reset').style.margin = '0px 0px 10% 0px';
document.getElementById('section').style.fontFamily = "Linux Libertine";
document.getElementById('section').style.fontSize = '14px';
document.getElementById('section').style.margin = '0px 5px 12px 0px';
document.getElementById('section').style.textAlign = 'center';

var number = localStorage.getItem('wikiCount');

if  (number === null){
	number = 0;} 
	
if (number == 1){
	localStorage.setItem('since', localStorage.lastVisit);
}

document.getElementById('reset').addEventListener('click', resetCounter);

chrome.history.onVisited.addListener(function(result) {
	var wiki = result.url.search('wikipedia.org');
	var wikihash = result.url.search('#');
	if (wiki !== -1 && wikihash == -1) {
		number++;
		storestate();
		badge();
	} else {
		return;
	}
});

function storestate(){
	localStorage.wikiCount = number;
	localStorage.lastVisit = new Date().toLocaleString("en-GB");
};

function retrievestate(){	
	if (localStorage.wikiCount) {
		document.getElementById('counter').innerHTML = '<strong>' + localStorage.wikiCount + '</strong> Wikivisits<hr><strong>Since </strong>' + localStorage.since + '<hr><strong>Last visit </strong>' + localStorage.lastVisit + '<hr>';
	} else {
		localStorage.setItem('wikiCount', '0');
	    retrievestate();
	}
};

function resetCounter(){
	localStorage.removeItem('wikiCount');
	number = 0;
	localStorage.since = 'N/A';
	retrievestate();
	badge();
};

chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 0, 125]});

function badge(){
	var badgenumber = number.toString();
	chrome.browserAction.setBadgeText({
		text: badgenumber
	});
};

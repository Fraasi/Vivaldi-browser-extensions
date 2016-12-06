(function () {

	document.addEventListener('DOMContentLoaded', retrievestate, false);

	document.onreadystatechange = function () {
		if (document.readyState === 'complete') {
			badge();
		}
	};

	var todos = document.getElementById('todolist'),
	form = document.querySelector('form'),
	newTask = document.querySelector('#newtask'),
	removeButton = document.querySelector('button');

	form.addEventListener('submit', function (e) {
		todos.innerHTML += "<li>" + newTask.value + "</li>";
		newTask.value = '';
		newTask.focus();
		storestate();
		e.preventDefault();
		badge();
	}, false);

	removeButton.addEventListener('click', function (e) {
		var lis = document.getElementsByTagName('LI');
		for (var i = lis.length - 1; i >= 0 ; i--) {
			if (lis[i].classList.contains('done')) {
				lis[i].parentNode.removeChild(lis[i]);
			}
		};
		newTask.focus();
		storestate();
		e.preventDefault();
		badge();
	}, false);

	todos.addEventListener('click', function (event) {
		var target = event.target;
		if (target.tagName === 'LI') {
			if (target.classList.contains('done')) {
				target.classList.remove('done');
			} else {
				target.classList.add('done');
			}
			newTask.focus();
			storestate();
			badge();
		}
		event.preventDefault();
	}, false);
// dblclick
	todos.addEventListener('dblclick', function(event) {
		var target = event.target
		var text = event.target.outerText;
		var textarea = document.createElement('textarea');
		textarea.value = text;
		target.appendChild(textarea);
		textarea.focus();
		textarea.onblur = function (target) {
			event.target.innerHTML = textarea.value;
			storestate();
			newTask.focus();
		}
	});

	function storestate() {
		localStorage.todolist = todos.innerHTML;
	}

	function retrievestate() {
		if (localStorage.todolist) {
			todos.innerHTML = localStorage.todolist;
		}
	}
	
	function badge() {
		var badgenumber = todos.getElementsByTagName('li').length.toString();
		chrome.browserAction.setBadgeBackgroundColor({
			color: [111, 111, 111, 220]
		});
		chrome.browserAction.setBadgeText({
			text: badgenumber
		});
	}
})();
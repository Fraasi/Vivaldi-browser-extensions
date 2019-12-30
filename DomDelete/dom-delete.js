
(function() {
	chrome.runtime.sendMessage({"active": true});

	var overlay = document.createElement('div');
		overlay.style.pointerEvents = 'none';
		overlay.style.position = 'absolute';
		overlay.style.border = '1px solid rgba(125, 0, 0, 0.4)';
		overlay.style.background = 'rgba(100, 0, 0, 0.2)';
		overlay.style.zIndex = '9999999';
		document.body.appendChild(overlay);

	var tooltip = document.createElement('div');
		tooltip.style.pointerEvents = 'none';
		tooltip.style.position = 'fixed';
		tooltip.style.color = 'white';
		tooltip.style.padding = '5px';
		tooltip.style.border = '1px solid rgba(0, 0, 0, 0.6';
		tooltip.style.background = 'rgba(51, 51, 51, 0.7)';
		tooltip.style.zIndex = '9999999';
		document.body.appendChild(tooltip);

// pageoffset from https://github.com/uniphil/dom-destroyer
	function pageOffset(el) {
		var left = 0;
		var top = 0;
		while (el) {
		  left += el.offsetLeft;
		  top += el.offsetTop;
		  el = el.offsetParent;
		}
		return {left: left, top: top};
	};

// isfixed from https://stackoverflow.com/questions/19474320/detect-whether-an-element-has-positionfixed-possibly-by-parent-element-via-jq
	function isFixed(el){
    while (typeof el === 'object' && el.nodeName.toLowerCase() !== 'body') {
        if (window.getComputedStyle(el).getPropertyValue('position').toLowerCase() === 'fixed') return true;
        el = el.parentElement;
    }
    return false;
};

	function hoverOver(e) {
		let el = e.target;
		let offset = pageOffset(el);
		let bounds = el.getBoundingClientRect();
		overlay.style.top = offset.top + 'px';
		overlay.style.left = offset.left + 'px';
		overlay.style.width = bounds.width + 'px';
		overlay.style.height = bounds.height + 'px';
		tooltip.style.top = e.clientY + 'px';
		tooltip.style.left = e.clientX + 20 + 'px';
		tooltip.innerHTML = `DOM: ${el.nodeName}<br>id: ${el.id}<br>class: ${el.className}`;
		let tt = tooltip.getBoundingClientRect();
		if (tt.bottom > window.innerHeight) {
			tooltip.style.top = window.innerHeight - tt.height + 'px';
		}
		if (window.innerWidth - e.clientX < tt.width) {
			tooltip.style.left =  window.innerWidth - tt.width + 'px';
		}
		if (isFixed(el)) {
			overlay.style.top = offset.top + window.pageYOffset + 'px';
		}
	}

	function deleteDomElement(e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();
		e.target.remove();
	}

	function quit(e) {
		e.preventDefault();
		document.removeEventListener('mouseover', hoverOver);
		document.removeEventListener('click', deleteDomElement);
		document.removeEventListener("contextmenu", quit);
		tooltip.remove();
		overlay.remove();
		chrome.runtime.sendMessage({"active": false});
	}

	function addListeners() {
		document.addEventListener('mouseover', hoverOver);
		document.addEventListener('click', deleteDomElement);
		document.addEventListener("contextmenu", quit);
	};

	addListeners();
})();

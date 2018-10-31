function getSelector(item) {
	var selector;
	switch (item.substr(0, 1)) {
		case '#':
			selector = document.getElementById(item.substr(1));
			return selector;
			break;
		case '.':
			selector = document.getElementsByClassName(item.substr(1));
			for (var i = 0; i < selector.length; i++) {
				return selector[i];
			}
			break;
		default:
			selector = document.getElementsByTagName(item);
			for (var i = 0; i < selector.length; i++) {
				return selector[i];
			}
			break;
	}
}

function popupSelect(popup, action, selector, button) {
	var getPopup = getSelector(popup);
	if (button === undefined && action != 'close') {
		getPopup.classList.add(selector);
	} else {
		var getButton = getSelector(button);
		switch (action) {
			case 'close':
				getButton.onclick = function () {
					getPopup.classList.remove(selector);
				}
				break;
			case 'open':
				getPopup.classList.add(selector);
				break;
		}
	}
}

function setImagePopup(item, popup) {
	var getPopup = getSelector(popup);
	var src = item.href;
	getPopup.lastChild.remove();
	var img = document.createElement('img');
	img.className = "imagePopup";
	img.src = src;
	getPopup.appendChild(img);
	popupSelect(popup, 'open', 'opened');

}

popupSelect('.popup', 'close', 'opened', '.close');

function setAlbum() {

	function standardAlbum() {
		fetch('https://jsonplaceholder.typicode.com/photos/?albumId=1')
			.then(function (response) {
				return response.json();

			})
			.then(function (data) {
				var wrapp = getSelector('.thumbs');
				for (var i = 0; i < data.length; i++) {
					var img = document.createElement('img');
					var link = document.createElement('a');
					img.className = "thumb";
					img.src = data[i].thumbnailUrl;
					link.className = "image";
					link.href = data[i].url;
					link.setAttribute('data-inpopup', 'images');
					link.appendChild(img);
					wrapp.appendChild(link);
				}
			})
		fetch('https://jsonplaceholder.typicode.com/albums/')
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				var h1 = document.getElementsByTagName('h1')[0];
				h1.innerHTML = data[0].title;
			})
	}

	standardAlbum();

	var button = document.getElementsByClassName('btn_album');
	for (var i = 0; i < button.length; i++) {
		button[i].onclick = function (event) {
			var target = event.target;
			var attr = target.dataset.attr;
			getAlbum(attr);
		}
	}

	var albumId = 1;

	function getAlbum(item) {
		var attr = item;
		if (attr == 'prev') {
			albumId--;
		} else {
			albumId++;
		}
		fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + albumId)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				if (data[0].albumId == albumId) {
					var img = document.getElementsByClassName('thumb');
					for (var i = 0; i < img.length; i++) {
						img[i].src = data[i].thumbnailUrl;
					}
					var link = document.getElementsByClassName('image');
					for (var i = 0; i < link.length; i++) {
						link[i].href = data[i].url;
					}
				}
			})
		fetch('https://jsonplaceholder.typicode.com/albums/')
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].id == albumId) {
						var h1 = document.getElementsByTagName('h1')[0];
						h1.innerHTML = data[i].title;
					}
				}
			})
	}

	var wrapper = getSelector('.wrapper');
	wrapper.onclick = function (e) {
		var target = e.target;
		var parent = target.parentElement;
		e.preventDefault();
		e.stopPropagation();
		if (parent.className == 'image') {
			parent.preventDefault;
			setImagePopup(parent, '.popup');
		}
	}
}

setAlbum();

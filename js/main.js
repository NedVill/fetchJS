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

function openPopup(popup, button) {
	var thisPopup = getSelector(popup);
	if (button === undefined) {
		thisPopup.classList.add('opened');
	} else {
		var thisButton = getSelector(button);
		thisButton.onclick = function () {
			thisPopup.classList.add('opened');
		}
	}
}

function closePopup(popup, button) {
	var thisPopup = getSelector(popup);
	if (button === undefined) {
		thisPopup.classList.remove('opened');
	} else {
		var thisButton = getSelector(button);
		thisButton.onclick = function () {
			thisPopup.classList.remove('opened');
		}
	}
}

function createElement(elem, classes, attr) {
	var elem = document.createElement(elem);
	elem.classList.add(classes);
	if (attr) {
		elem.setAttribute('data-attr', attr);
	}
	return elem;
}

function setImagePopup(item, popup) {
	var getPopup = getSelector(popup);
	var src = item.href;
	getPopup.lastChild.remove();
	var img = createElement('img', 'imagePopup');
	img.src = src;
	getPopup.appendChild(img);
	setTimeout(function () {
		openPopup(popup);
	}, 100)
}

closePopup('.popup', '.close');

function setWrapp(data) {
	var thumbs = createElement('div', 'thumbs');
	var album = getSelector('.album');
	var albumContent = createElement('div', 'album-content');
	var title = createElement('h1', 'title-album');
	var buttonPrev = createElement('button', 'btn_album', 'prev');
	var buttonNext = createElement('button', 'btn_album', 'next');
	buttonNext.classList.add('next');
	buttonPrev.classList.add('prev');
	album.appendChild(buttonPrev);
	album.appendChild(albumContent);
	album.appendChild(buttonNext);
	albumContent.appendChild(title);
	albumContent.appendChild(thumbs);

	data.forEach(function (data) {
		var img = createElement('img', 'thumb');
		var link = createElement('a', 'image');
		img.src = data.thumbnailUrl;
		link.href = data.url;
		link.appendChild(img);
		thumbs.appendChild(link);
	})
}

function setImages(count) {
	for (var i = 0; i < count; i++) {
		var thumbs = getSelector('.thumbs');
		var img = createElement('img', 'thumb');
		var link = createElement('a', 'image');
		img.src = data.thumbnailUrl;
		link.href = data.url;
		link.appendChild(img);
		thumbs.appendChild(link);
	}
}

var countAlbum = 0;

function setAlbum() {

	countAlbum++;

	if (countAlbum > 1) {
		return false;
	}

	var albumId = 1;

	initAlbum(albumId);

	var album = getSelector('.album');
	
	album.onclick = function (e) {
		var target = e.target;
		if (target.classList.contains('btn_album')) {
			var attr = target.dataset.attr;
			getAlbum(attr);
		} else {
			return;
		}
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
	
	function initAlbum(id) {
		fetch('https://jsonplaceholder.typicode.com/photos/?albumId=' + id)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				setWrapp(data);
				setTitle();
			})
	}	

	function getPhotos(id) {
		fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + id)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				var img = document.getElementsByClassName('thumb');
				var thumbs = getSelector('.thumbs');
				var lengthData = data.length;
				var imgLength = img.length;

				if (imgLength > lengthData) {
					var total = imgLength - lengthData;
					while (img[total]) {
						thumbs.removeChild(img[total]);
					}
				}

				if (imgLength < lengthData) {
					var total = lengthData - imgLength;
					setImages(total);
				}

				Array.prototype.forEach.call(img, function (img, i) {
					img.src = data[i].thumbnailUrl;
				})

				var link = document.getElementsByClassName('image');
				Array.prototype.forEach.call(link, function (link, i) {
					link.href = data[i].url;
				})

			})
	}

	function setTitle(id) {
		if (id === undefined) {
			id = 1;
		}
		fetch('https://jsonplaceholder.typicode.com/albums?id=' + id)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				data.forEach(function (data) {
					var h1 = getSelector('.title-album');
					h1.innerHTML = data.title;
				})
			})
	}

	function getAlbum(attr) {
		if (attr == 'prev') {
			albumId--;
		} else {
			albumId++;
		}
		if (albumId < 1) {
			albumId = 1
			return;
		}

		getPhotos(albumId);
		setTitle(albumId);
	}

}

setAlbum();

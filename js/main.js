function getSelector(item, parent) {
	var parentElem;
	if (!parent) {
		parentElem = document;
	} else {
		parentElem = parent;
	}
	var selector;
	switch (item.substr(0, 1)) {
		case '#':
			selector = parentElem.getElementById(item.substr(1));
			return selector;
			break;
		case '.':
			selector = parentElem.getElementsByClassName(item.substr(1));
			for (var i = 0; i < selector.length; i++) {
				return selector[i];
			}
			break;
		default:
			selector = parentElem.getElementsByTagName(item);
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

closePopup('.popup', '.close');

function AlbumMake(parent) {

		var parentWrapper = getSelector(parent);

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

		function setWrapp(data, parent) {
			var thumbs = createElement('div', 'thumbs');
			var albumWrapper = parent;
			var album = createElement('div', 'album');
			var wrapper = createElement('div', 'wrapper');
			var albumContent = createElement('div', 'album-content');
			var title = createElement('h1', 'title-album');
			var buttonPrev = createElement('button', 'btn_album', 'prev');
			var buttonNext = createElement('button', 'btn_album', 'next');
			buttonNext.classList.add('next');
			buttonPrev.classList.add('prev');
			albumWrapper.appendChild(wrapper);
			wrapper.appendChild(album);
			album.appendChild(buttonPrev);
			album.appendChild(albumContent);
			album.appendChild(buttonNext);
			albumContent.appendChild(title);
			albumContent.appendChild(thumbs);

			var datas = data;

			datas.forEach(function (datas) {
				var img = createElement('img', 'thumb');
				var link = createElement('a', 'image');
				img.src = datas.thumbnailUrl;
				link.href = datas.url;
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

		function setAlbum() {

			var albumId = 1;
			initAlbum(albumId);
			parentWrapper.onclick = function (e) {
				var target = e.target;
				var parent = target.parentElement;
				e.preventDefault();
				e.stopPropagation();
				if (parent.className == 'image') {
					parent.preventDefault;
					setImagePopup(parent, '.popup');
				}
				if (target.classList.contains('btn_album')) {
					var attr = target.dataset.attr;
					getAlbum(attr);
				} else {
					return;
				}
			}

			function initAlbum(id) {
				fetch('https://jsonplaceholder.typicode.com/photos/?albumId=' + id)
					.then(function (response) {
						return response.json();
					})
					.then(function (data) {
						setWrapp(data, parentWrapper);
						setTitle(data);
					});
			}

			function getPhotos(id, data) {
				var img = parentWrapper.getElementsByClassName('thumb');
				var tumb = getSelector('.thumbs', parentWrapper);
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
				var link = parentWrapper.getElementsByClassName('image');
				Array.prototype.forEach.call(link, function (link, i) {
					link.href = data[i].url;
				})
			}

			function setTitle(data) {
				data.forEach(function (data) {
					var h1 = getSelector('.title-album', parentWrapper);
					h1.innerHTML = data.title;
				})
			}

			function checkAlbum(id, attr) {
				fetch('https://jsonplaceholder.typicode.com/photos/?albumId=' + id)
					.then(function (response) {
						return response.json();
					})
					.then(function (data) {
						if (data.length == 0) {
							alert('Закончились альбомы');
							if (attr == 'prev') {
								albumId++;
							} else {
								albumId--;
							}
							return;
						} else {
							getPhotos(id, data);
							setTitle(data);
						}
					});
			}

			function getAlbum(attr) {

				if (attr == 'prev') {
					albumId--;
				} else {
					albumId++;
				}
				checkAlbum(albumId, attr);
			}
			
		}
		setAlbum();

};

AlbumMake('.albumOne');
//AlbumMake('.wrapperok');
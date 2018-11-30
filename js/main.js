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

var AlbumMake = {
	init: function (parent) {
		var parents = getSelector(parent);
		AlbumMake.parent = parents;
		AlbumMake.counts += AlbumMake.counts;
		AlbumMake.setAlbum();
	},
	parent,
	albumId: 1,
	setAlbum: function () {
		var parent = AlbumMake.parent;
		var albumId = AlbumMake.albumId;
		AlbumMake.initAlbum(albumId);
		return;
	},
	changes: function (parent) {
		var parent = getSelector(parent);
		parent.addEventListener("click", function (e) {
			var target = e.target;
			var parentTarget = target.parentElement;
			e.preventDefault();
			e.stopPropagation();
			if (parentTarget.className == 'image') {
				parentTarget.preventDefault;
				AlbumMake.setImagePopup(parentTarget, '.popup');
			}
			if (target.classList.contains('btn_album')) {
				var attr = target.dataset.attr;
				AlbumMake.getAlbum(attr);
			} else {
				return;
			}
		})
	},
	initAlbum: function (id) {
		fetch('https://jsonplaceholder.typicode.com/photos/?albumId=' + id)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				AlbumMake.setWrapp(data);
				AlbumMake.setTitle(data);
			});
	},
	createElement: function (elem, classes, attr) {
		var elem = document.createElement(elem);
		elem.classList.add(classes);
		if (attr) {
			elem.setAttribute('data-attr', attr);
		}
		return elem;
	},
	setImagePopup: function (item, popup) {
		var getPopup = getSelector(popup);
		var src = item.href;
		getPopup.lastChild.remove();
		var img = AlbumMake.createElement('img', 'imagePopup');
		img.src = src;
		getPopup.appendChild(img);
		setTimeout(function () {
			openPopup(popup);
		}, 100)
	},
	setWrapp: function (data) {
		var thumbs = AlbumMake.createElement('div', 'thumbs');
		var albumWrapper = AlbumMake.parent;
		var album = AlbumMake.createElement('div', 'album');
		var wrapper = AlbumMake.createElement('div', 'wrapper');
		var albumContent = AlbumMake.createElement('div', 'album-content');
		var title = AlbumMake.createElement('h1', 'title-album');
		var buttonPrev = AlbumMake.createElement('button', 'btn_album', 'prev');
		var buttonNext = AlbumMake.createElement('button', 'btn_album', 'next');
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
			var img = AlbumMake.createElement('img', 'thumb');
			var link = AlbumMake.createElement('a', 'image');
			img.src = datas.thumbnailUrl;
			img.alt = datas.title;
			link.href = datas.url;
			link.appendChild(img);
			thumbs.appendChild(link);
		})
	},
	setImages: function (count) {
		for (var i = 0; i < count; i++) {
			var thumbs = getSelector('.thumbs');
			var img = AlbumMake.createElement('img', 'thumb');
			var link = AlbumMake.createElement('a', 'image');
			img.src = data.thumbnailUrl;
			link.href = data.url;
			link.appendChild(img);
			thumbs.appendChild(link);
		}
	},
	getPhotos: function (id, data) {
		var parentWrapper = AlbumMake.parent;
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
			AlbumMake.setImages(total);
		}
		Array.prototype.forEach.call(img, function (img, i) {
			img.src = data[i].thumbnailUrl;
		})
		var link = parentWrapper.getElementsByClassName('image');
		Array.prototype.forEach.call(link, function (link, i) {
			link.href = data[i].url;
		})
	},
	setTitle: function (data) {
		data.forEach(function (data) {
			var parentWrapper = AlbumMake.parent;
			var h1 = getSelector('.title-album', parentWrapper);
			h1.innerHTML = data.title;
		})
	},
	checkAlbum: function (id, attr) {
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
					AlbumMake.getPhotos(id, data);
					AlbumMake.setTitle(data);
				}
			});
	},
	getAlbum: function (attr) {
		var albumId = AlbumMake.albumId;
		if (attr == 'prev') {
			albumId--;
		} else {
			albumId++;
		}
		AlbumMake.albumId = albumId;
		AlbumMake.checkAlbum(albumId, attr);
	}
};

AlbumMake.init('.albumOne');
AlbumMake.changes('.albumOne');

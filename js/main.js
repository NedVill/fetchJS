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
	if(button === undefined) {
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
	if(button === undefined) {
		thisPopup.classList.remove('opened');
	} else {
		var thisButton = getSelector(button);	
		thisButton.onclick = function () {
		thisPopup.classList.remove('opened');
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
	setTimeout(function(){
		openPopup(popup);
	},100)
}

closePopup('.popup','.close');

function setWrapp(data) {
	
	var thumbs = document.createElement('div');
	thumbs.classList.add('thumbs');
	
	var album = getSelector('.album');
	
	var albumContent = document.createElement('div');
	albumContent.classList.add('album-content');	
	
	var title = document.createElement('h1');

	var buttonPrev = document.createElement('button');
	buttonPrev.classList.add('btn_album', 'prev');
	buttonPrev.setAttribute('data-attr','prev');	
	
	var buttonNext = document.createElement('button');
	buttonNext.classList.add('btn_album','next');
	buttonNext.setAttribute('data-attr','next');	

	
	album.appendChild(buttonPrev);
	album.appendChild(albumContent);
	album.appendChild(buttonNext);
	
	albumContent.appendChild(title);
	albumContent.appendChild(thumbs);	
	
	for (var i = 0; i < data.length; i++) {
		var img = document.createElement('img');
		var link = document.createElement('a');
		img.className = "thumb";
		img.src = data[i].thumbnailUrl;
		link.className = "image";
		link.href = data[i].url;
		link.setAttribute('data-inpopup', 'images');
		link.appendChild(img);
		thumbs.appendChild(link);
		
	}	
	
}

var countAlbum = 0;

function setAlbum() {
	
	countAlbum++;
	if(countAlbum > 1) {
		return false;
	}
	
	function getPhotos(id) {
		fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + id)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			if (data[0].albumId == id) {
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
	}

	function setTitle(id) {
		if(id === undefined) {
			id = 1;
		}
		fetch('https://jsonplaceholder.typicode.com/albums?id=' + id)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				for (var i = 0; i < data.length; i++) {
					var h1 = document.getElementsByTagName('h1')[0];
					h1.innerHTML = data[0].title;
				}
			})			
	}

	function initAlbum() {
		fetch('https://jsonplaceholder.typicode.com/photos/?albumId=1')
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				setWrapp(data);
				setTitle();
			})
	}

	initAlbum();
	
	var albumId = 1;

	var album = getSelector('.album');
	album.onclick = function(e) {
		var target = e.target;
		//var parent = target.parentElement;
		if(target.classList.contains('btn_album')) {
			var attr = target.dataset.attr;
			getAlbum(attr);
		} else {
			return;
		}
	}
	
	function getAlbum(item) {
		var attr = item;
		if (attr == 'prev') {
			albumId--;
		} else {
			albumId++;
		}
		if(albumId < 1) {
			albumId = 1
			return;
		}
		getPhotos(albumId);
		setTitle(albumId);
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
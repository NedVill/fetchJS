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

/* Сначала загрузим альбом по дефолту (создадим в разметке изображения и обернем их в обертку фансибокса) */

function standardAlbum() {
	var album = getSelector('.album');
	var albumId = album.dataset.id;
	fetch('https://jsonplaceholder.typicode.com/photos/?albumId=' + albumId)
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
				link.setAttribute('data-fancybox', 'images');
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

var button = document.getElementsByTagName('button');
for (var i = 0; i < button.length; i++) {
	button[i].onclick = function (event) {
		var target = event.target;
		getAlbum(target);
	}
}

function getAlbum(item) {
	var attr = item.dataset.attr;
	var album = getSelector('.album');
	var albumId = album.dataset.id;
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
	album.setAttribute('data-id', albumId);
}
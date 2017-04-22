var el = document.getElementById('container');
var files = [];
var img = new Image;
var URL_ = window.URL || window.webkitURL;

img.addEventListener('load', function (e) {

// Free link to the file
URL_.revokeObjectURL(img.src);

img.onload() = draw();
// Draw image

// // Process next
// generatePreview();
// }, false);

// el.addEventListener('dragenter', function (e) {
//   e.preventDefault();
// }, false);

// el.addEventListener('dragover', function (e) {
//   e.preventDefault();
// }, false);

// el.addEventListener('drop', function (e) {
//   e.preventDefault();
//   files = Array.prototype.slice.call(e.dataTransfer.files, 0);

//   generatePreview();
// }, false);

// function generatePreview() {
//   if (files.length == 0) return;
//   image.src = URL_.createObjectURL(files.shift());
// }



function draw() {

	var ctx = document.createElement('canvas');
	ctx.width = 100;
	ctx.height = 100;
	// ctx.getContext('2d').drawImage(img, 0, 0, 100, 100);

	el.appendChild(ctx);
	var dArr = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1]; // offset array
	var s = 2;  // thickness scale
	var i = 0;  // iterator
	var x = 5;  // final position
	var y = 5;

	// draw images at offsets from the array scaled by s
	for(; i < dArr.length; i += 2) {
		ctx.drawImage(img, x + dArr[i]*s, y + dArr[i+1]*s);
	}

	// fill with color
	ctx.globalCompositeOperation = "source-in";
	ctx.fillStyle = "red";
	ctx.fillRect(0,0,canvas.width, canvas.height);

	// draw original image in normal mode
	ctx.globalCompositeOperation = "source-over";
	ctx.drawImage(img, x, y);
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function draw() {
	// TODO check if valid URL before doing this function 

	var img = new Image;
	img.onload = draw;
	img.src = document.getElementById('image-url').value;
	img.scale

	// TODO resize image

	var dArr = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1]; // offset array
	var s = 1	;  // thickness scale
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


function outline() {
	var root = (375,375);
	var path1 = new Path2D();
	path1.rect(10, 10, 100,100);


}
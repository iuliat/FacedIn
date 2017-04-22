

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


function draw() {
	// TODO check if valid URL before doing this function 

	var img = new Image;
	img.onload = draw;
	var url = document.getElementById('image-url').value;
	img.src = url + '?' + new Date().getTime();
	img.setAttribute('crossOrigin', '');



	// TODO resize image

	var dArr = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1]; // offset array
	// thickness scale
	var s = 1;
  	// final position
	var x = 5;
	var y = 5;

	// draw images at offsets from the array scaled by s
	for(var i = 0; i < dArr.length; i += 2) {
		ctx.drawImage(img, x + dArr[i]*s, y + dArr[i+1]*s);
	}

	// fill with color
	ctx.globalCompositeOperation = "source-in";
	ctx.fillStyle = "red";
	ctx.fillRect(0,0,canvas.width, canvas.height);

	// draw original image in normal mode
	ctx.globalCompositeOperation = "source-over";
	ctx.drawImage(img, x, y);

	console.log("image data: " + ctx.getImageData(10,10,50,50));
}




function outline() {
	var root = (375,375);
    ctx.beginPath();
	ctx.lineT
o

}
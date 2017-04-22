var ctx = canvas.getContext('2d');

function draw() {
	// if valid URL

	var img = new Image;
	img.onload = draw;
	img.src = document.getElementById('image-url').value;

var dArr = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1], // offset array
s = 2,  // thickness scale
i = 0,  // iterator
x = 5,  // final position
y = 5;

// draw images at offsets from the array scaled by s
for(; i < dArr.length; i += 2)
	ctx.drawImage(img, x + dArr[i]*s, y + dArr[i+1]*s);

// fill with color
ctx.globalCompositeOperation = "source-in";
ctx.fillStyle = "red";
ctx.fillRect(0,0,canvas.width, canvas.height);

// draw original image in normal mode
ctx.globalCompositeOperation = "source-over";
ctx.drawImage(img, x, y);
}
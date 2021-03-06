var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// TODO:
// crop image to square aspect ratio
// resize image to 500 x 500
// see https://foliotek.github.io/Croppie/

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

var imageAsBase64 = canvas.toDataURL();


// global params because i don't know how variable scoping works bc
//  i didn't pay attention to inheritance lectures
// does js have inheritance? props and super and shit is some es6 bs
var thicknessParam = 20;
var points = [];
var globalWidth;
var globalHeight;


function edgeDetector(){
  
  // Variables
  this.img = undefined;
  this.imgElement = undefined;
  this.ctx = undefined;
  this.canvasElement = undefined;
  this.rawctx = undefined;
  this.rawCanvas = undefined;
 


  this.ctxDimensions = {
    width: undefined,
    height:undefined
  };
  this.pixelData = undefined;
  this.threshold = 30;
  this.pointerColor = 'rgba(255,0,0,1)';
  
  
  this.init = function(){
    // Build the canvas
    var width = $(this.imgElement).width();
    var height = $(this.imgElement).height();
    // $("<canvas id=\"tree\" width=\""+width+"\" height=\""+height+"\"></canvas>").insertAfter(this.imgElement); 
    $("<canvas id=\"rawData\" width=\""+width+"\" height=\""+height+"\"></canvas>").insertAfter(this.imgElement);
    $("<canvas id=\"layer\" width=\""+width+"\" height=\""+height+"\"></canvas>").insertAfter(this.imgElement);

    this.rawCanvas = $("#rawData")[0];
    this.canvasElement = $("#layer")[0];
    this.rawctx = this.rawCanvas.getContext('2d');
    this.ctx = this.canvasElement.getContext('2d');
    // this.treeCanvas = $("#tree")[0];
    // this.treectx = this.treeCanvas.getContext('2d');

    // Store the Canvas Size
    this.ctxDimensions.width = width;
    this.ctxDimensions.height = height;
    globalWidth = width;
    globalHeight = height;
  };
  
  this.findEdges = function(){
    this.copyImage();
    this.coreLoop();
  };
  
  this.copyImage = function(){
    this.rawctx.clearRect(0,0,this.ctxDimensions.width,this.ctxDimensions.height);
    this.ctx.drawImage(this.imgElement,0,0);

    //Grab the Pixel Data, and prepare it for use
    this.pixelData = this.ctx.getImageData(0,0,this.ctxDimensions.width, this.ctxDimensions.height);
  };
  
  this.coreLoop = function(){
    var x = 0;
    var y = 0;
    // var rootX = this.width/2;
    // var rootY = this.height;

    var left = undefined;
    var top = undefined;
    var right = undefined;
    var bottom = undefined;

    for(y=0;y<this.pixelData.height;y++){
        for(x=0;x<this.pixelData.width;x++){
            // get this pixel's data
            // currently, we're looking at the blue channel only.
            // Since this is a B/W photo, all color channels are the same.
            // ideally, we would make this work for all channels for color photos.
            index = (x + y * this.ctxDimensions.width) * 4;
            pixel = this.pixelData.data[index+2];

            // Get the values of the surrounding pixels
            // Color data is stored [r,g,b,a][r,g,b,a]
            // in sequence.
            left = this.pixelData.data[index-4];
            right = this.pixelData.data[index+2];
            top = this.pixelData.data[index-(this.ctxDimensions.width*4)];
            bottom = this.pixelData.data[index+(this.ctxDimensions.width*4)];

            //Compare it all.
            // (Currently, just the left pixel)
            if(pixel>left+this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel<left-this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel>right+this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel<right-this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel>top+this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel<top-this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel>bottom+this.threshold){
                this.plotPoint(x,y);
            }
            else if(pixel<bottom-this.threshold){
                this.plotPoint(x,y);
            }
        }
    }
  };
  
  this.plotPoint = function(x,y){
      this.ctx.beginPath();
      this.ctx.arc(x, y, 0.5, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = 'red';
      this.ctx.fill();
      this.ctx.beginPath();

      // Copy onto the raw canvas
      // this is probably the most useful application of this,
      // as you would then have raw data of the edges that can be used.

      this.rawctx.beginPath();
      this.rawctx.arc(x, y, 0.5, 0, 2 * Math.PI, false);
      this.rawctx.fillStyle = 'red';
      this.rawctx.fill();
      this.rawctx.beginPath();

      // add points for tree
      if (x % thicknessParam === 0 && y % thicknessParam === 0){
        points.push([x, y]);
      }
  };
}

var edgeDetector = new edgeDetector();

// $(document).ready(function(){
go = function() {
  // Run at start
  // edgeDetector.img = imageAsBase64;
  edgeDetector.imgElement = $('.image')[0];
  edgeDetector.init();
  edgeDetector.findEdges();
   $('#threshold').change(function(){
    points.length=0;
    edgeDetector.threshold = $(this).val();
    edgeDetector.findEdges();
  });

};


go2 = function() {
  if ($('#tree')) {
    $('#tree').remove();
  }
  $("<canvas id=\"tree\" width=\""+500+"\" height=\""+500+"\"></canvas>").insertAfter($('#rawData'));
  treeCanvas = $("#tree")[0];
  treectx = treeCanvas.getContext('2d');
  treectx.beginPath();
  treectx.moveTo(globalWidth/2, globalHeight);
  treectx.lineTo(globalWidth/2, (2 * globalHeight) / 10);

 
  var drawBranches = function(startX, startY, depth) {
    resultX1 = startX-10; 
    resultX2 = startX+10;
    resultY = startY - 10;
    treectx.lineTo(resultX1, resultY);
    treectx.lineTo(resultX2, resultY);
    if (depth < 7) {
      drawBranches(resultX1, resultY, depth+1); // left branch
      drawBranches(resultX2, resultY, depth+1); // right branch
    }
  }

  drawBranches(globalWidth/2, (2 * globalHeight) / 3, 0);


  treectx.stroke();


  // treectx.moveTo(globalWidth/2, (2 * globalHeight) / 3);
  //   var h = 
  //   for (var j = 0; j <3; j++) {

  //   }
  // }
  // // unless reach boundary segment
  // // split into 3 and draw at some other angles
  // // treectx.rotate(45 * Math.PI / 180);
  // treectx.lineTo(0, 0);
  // treectx.moveTo(globalWidth/2, (2 * globalHeight) / 3);
  // treectx.lineTo(globalWidth, 0);

  
  // treectx.rotate(-45 * Math.PI / 180);



  // treectx.stroke();

  // for (var i = 0; i < points.length; i++){
  //   var x = points[i][0];
  //   var y = points[i][1];
  //   treectx.moveTo(x, y);
  //   treectx.lineTo(rootX, rootY);
  //   treectx.stroke();
  // }
}

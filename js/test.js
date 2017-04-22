function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');    
    var rootX = 375;
    var rootY = 375;
    
    var points = [(0, 200), (25, 175), (50, 150), (75, 125), (100, 100), (125, 75), (150, 50), (175, 25), (200, 0)]
    
    ctx.beginPath();
    for (var i = 0; i < points.length; i++) {
      var point = points[i];
    	ctx.moveTo(point);
      ctx.lineTo(rootX, rootY);
    }
    ctx.stroke();
  }
}

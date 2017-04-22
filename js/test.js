function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');    
    var rootX = 150;
    var rootY = 300;
    
    var points = [[-25, 225], [0, 200], [25, 175], [50, 150], [75, 125], [100, 100], [125, 75], [150, 50], [175, 25], [200, 0], [225, -25]]
    
    ctx.beginPath();
    for (var i = 0; i < points.length; i++) {
      var pointX = points[i][0];
      var pointY = points[i][1];
    	ctx.moveTo(pointX, pointY);
      ctx.lineTo(rootX, rootY);
    }
    ctx.stroke();
  }
}

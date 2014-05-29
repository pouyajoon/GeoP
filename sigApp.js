function SigCtrl($scope) {

  var s = Snap("#main");

  function stroke(r, c) {
    r.attr({
      'stroke': c
    });
  }

  var items = [];

  function removeElementIfNotEmpty(e) {
    if (e !== void 0) {
      e.remove();
    }
  }

  var points = [];
  var polyline;
  var currentLine;


  function createAndAddSvgPoint(x, y) {
    var point = s.node.createSVGPoint();
    point.x = x;
    point.y = y;
    points.push(point);
    return point;
  }

  function initPolyline(x, y) {
    var point = createAndAddSvgPoint(x, y);
    polyline = s.polyline(point.x, point.y);
    polyline.attr({
      fill: 'transparent',
      stroke: 'green'
    });
  }

  function addPointToPolyine(x, y) {
    var point = createAndAddSvgPoint(x, y);
    polyline.node.points.appendItem(point);
  }

  var cp = function(e) {
    if (polyline === void 0) {
      initPolyline(e.offsetX, e.offsetY);
    } else {
      addPointToPolyine(e.offsetX, e.offsetY);
    }
  }
  var drawToMousePosition = function(e) {
    if (points.length > 0) {
      var lastPoint = points[points.length - 1];
      if (currentLine === void 0) {
        currentLine = s.line(lastPoint.x, lastPoint.y, e.offsetX, e.offsetY);
        stroke(currentLine, 'green');
      } else {
        currentLine.animate({
          x1: lastPoint.x,
          y1: lastPoint.y,
          x2: e.offsetX,
          y2: e.offsetY
        }, 5);
      }

    }
  }

  $scope.createPolyline = function() {
    s.click(cp);
    s.mousemove(drawToMousePosition);
  }


  $scope.closePolyline = function(e) {
    if (points.length > 0) {
      addPointToPolyine(points[0].x, points[0].y);
    }
    var p = polyline;
    polyline.hover(function(e) {
      stroke(p, 'red');
    }, function() {
      stroke(p, 'blue');
    });
    stroke(polyline, 'blue');
    polyline.drag();

    removeElementIfNotEmpty(currentLine);
    currentLine = undefined;
    polyline = undefined;
    points = [];

    s.unclick(cp);
    s.unmousemove(drawToMousePosition);
  };

  $scope.create = function() {
    var r = s.rect(0, 0, 40, 50);
    r.attr({
      fill: 'transparent'
    });
    stroke(r, 'blue');
    r.hover(function(e) {
      stroke(r, 'red');
    }, function() {
      stroke(r, 'blue');
    });
    r.drag();
    items.push(r);
  }

  var create = {
    label: 'create',
    action: $scope.create
  };
  var createPolyline = {
    label: 'create polyline',
    action: $scope.createPolyline
  };
  var closePolyline = {
    label: 'close polyline',
    action: $scope.closePolyline
  };

  $scope.buttons = [create, createPolyline, closePolyline];
}
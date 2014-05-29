/*global GeoP:true */

(function(geoP) {
  "use strict";

  var createPolylineLine = null;
  var createPolylinePolyline = null;

  var a = Snap;

  var SvgEditor = function(svgId) {
    this.paper = a(svgId);
  };

  SvgEditor.prototype.createPolylineMode = function(e) {
    if (createPolylinePolyline === null) {
      createPolylinePolyline = new geoP.Polyline(this);
      createPolylinePolyline.create(e.offsetX, e.offsetY);
    } else {
      createPolylinePolyline.appendPoint(e.offsetX, e.offsetY);
    }
  };

  SvgEditor.prototype.drawToMousePosition = function(e) {
    if (createPolylinePolyline !== null) {
      var lastPoint = createPolylinePolyline.getLastPoint();
      if (lastPoint !== null) {
        if (createPolylineLine === null) {
          createPolylineLine = this.paper.line(lastPoint.x, lastPoint.y, e.offsetX, e.offsetY);
          this.stroke(createPolylineLine, 'green');
        } else {
          createPolylineLine.animate({
            x1: lastPoint.x,
            y1: lastPoint.y,
            x2: e.offsetX,
            y2: e.offsetY
          }, 5);
        }
      }
    }
  };


  SvgEditor.prototype.stroke = function(r, c) {
    r.attr({
      'stroke': c
    });
  };

  SvgEditor.prototype.createPolyline = function($scope) {
    var that = this;

    var createMode = this.createPolylineMode.bind(this);
    var move = this.drawToMousePosition.bind(this);
    this.paper.click(createMode);
    this.paper.mousemove(move);


    function finishCreateMode() {
      that.paper.unclick(createMode);
      that.paper.unmousemove(move);
      if (createPolylineLine !== null) {
        createPolylineLine.remove();
      }
      createPolylinePolyline = null;
      createPolylineLine = null;
      $scope.currentOptions = [];

    }

    return [{
      label: 'close',
      action: function() {
        if (createPolylinePolyline !== null) {
          createPolylinePolyline.close();
        }
        finishCreateMode();
      }
    }, {
      label: 'remove',
      action: function() {
        if (createPolylinePolyline !== null) {
          createPolylinePolyline.remove();
        }
        finishCreateMode();
      }
    }];

  };

  // SvgEditor.prototype.closePolyline = function() {

  // };

  geoP.SvgEditor = SvgEditor;

}(GeoP));
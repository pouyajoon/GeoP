/*global GeoP:true */

(function(geoP) {
  "use strict";


  var a = Snap;

  var SvgEditor = function(svgId, $scope) {
    var that = this;
    this.paper = a(svgId);
    // this.$scope = $scope;
    this.createPolylineLine = null;
    this.createPolylinePolyline = null;

    this.items = [];

    this.paper.click(function(e) {
      if (geoP.currentEvent === null && $scope.mode !== 'create') {
        for (var i = 0; i < that.items.length; i++) {
          var item = that.items[i];
          that.stroke(item.element, GeoP.Colors.NotSelected);
        };
        $scope.cleanCurrentOptions();
        $scope.$apply();
      }
      geoP.currentEvent = null;
    });
  };

  SvgEditor.prototype.createPolylineMode = function(e) {
    if (this.createPolylinePolyline === null) {
      this.createPolylinePolyline = new geoP.Polyline(this);
      this.createPolylinePolyline.create(e.offsetX, e.offsetY);
    } else {
      this.createPolylinePolyline.appendPoint(e.offsetX, e.offsetY);
    }
  };

  SvgEditor.prototype.drawToMousePosition = function(e) {
    if (this.createPolylinePolyline !== null) {
      var lastPoint = this.createPolylinePolyline.getLastPoint();
      if (lastPoint !== null) {
        if (this.createPolylineLine === null) {
          this.createPolylineLine = this.paper.line(lastPoint.x, lastPoint.y, e.offsetX, e.offsetY);
          this.stroke(this.createPolylineLine, 'green');
        } else {
          this.createPolylineLine.animate({
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
      if (that.createPolylineLine !== null) {
        that.createPolylineLine.remove();
      }
      that.createPolylinePolyline = null;
      that.createPolylineLine = null;
      $scope.cleanCurrentOptions();
    }

    function cancelCurrentPolyline() {
      if (that.createPolylinePolyline !== null) {
        that.createPolylinePolyline.remove();
      }
      finishCreateMode();
    }

    return [{
      label: 'close',
      action: function() {
        if (that.createPolylinePolyline !== null) {
          that.createPolylinePolyline.close($scope);
          that.items.push(that.createPolylinePolyline);
        }
        finishCreateMode();
      }
    }, {
      label: 'cancel',
      action: cancelCurrentPolyline
    }];
  };


  geoP.SvgEditor = SvgEditor;

}(GeoP));
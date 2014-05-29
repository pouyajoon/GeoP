/*global GeoP:true */

(function(geoP) {
  "use strict";

  var Polyline = function(svgEditor) {
    this.svgEditor = svgEditor;
  };

  Polyline.prototype.createSvgPoint = function(x, y) {
    var point = this.svgEditor.paper.node.createSVGPoint();
    point.x = x;
    point.y = y;
    return point;
  };

  Polyline.prototype.create = function(x, y) {
    var point = this.createSvgPoint(x, y);
    this.element = this.svgEditor.paper.polyline(point.x, point.y);
    this.element.attr({
      fill: 'transparent',
      stroke: 'green'
    });
  };

  Polyline.prototype.getLastPoint = function() {
    var l = this.element.node.points.length;
    if (l > 0) {
      return this.element.node.points[l - 1];
    }
    return null;
  };

  Polyline.prototype.remove = function() {
    this.element.remove();
  };

  Polyline.prototype.appendPoint = function(x, y) {
    var point = this.createSvgPoint(x, y);
    this.element.node.points.appendItem(point);
  };

  Polyline.prototype.close = function() {
    var that = this;

    var p = this.element.node.points[0];
    this.appendPoint(p.x, p.y);

    this.svgEditor.stroke(this.element, 'blue');
    this.element.drag();
    this.element.hover(function(e) {
      that.svgEditor.stroke(that.element, 'red');
    }, function() {
      that.svgEditor.stroke(that.element, 'blue');
    });
  };

  geoP.Polyline = Polyline;


}(GeoP));
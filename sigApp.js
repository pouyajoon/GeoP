function SigCtrl($scope) {

  var editor = new GeoP.SvgEditor("#main");

  $scope.createPolyline = function() {
    var opts = editor.createPolyline($scope);
    $scope.currentOptions = opts;
  }

  var createPolyline = {
    label: 'create polyline',
    action: $scope.createPolyline
  };

  $scope.buttons = [createPolyline];
  $scope.currentOptions = [];
}
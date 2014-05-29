function SigCtrl($scope) {

  var editor = new GeoP.SvgEditor("#main", $scope);
  $scope.mode = 'normal';

  $scope.createPolyline = function() {
    $scope.mode = 'create';
    var opts = editor.createPolyline($scope);
    $scope.currentOptions = opts;
  }

  var createPolyline = {
    label: 'create polyline',
    action: $scope.createPolyline
  };

  $scope.cleanCurrentOptions = function() {
    $scope.currentOptions = [];
    $scope.mode = 'normal';
  }

  $scope.buttons = [createPolyline];
  $scope.currentOptions = [];
}
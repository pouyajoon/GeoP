function GeoPCtrl($scope) {


  function handleKey(e) {
    var key, isShift;
    if (window.event) {
      key = window.event.keyCode;
      isShift = window.event.shiftKey ? true : false;
    } else {
      key = ev.which;
      isShift = ev.shiftKey ? true : false;
    }
    $scope.isShift = isShift;
    $scope.$apply();
  }

  document.onkeydown = handleKey;
  document.onkeyup = handleKey;

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
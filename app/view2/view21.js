angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$timeout', function($scope, $timeout) {
      $scope.counter = 0;
      $scope.switcher = false;
      $scope.times = [];
      $scope.times.push(["", ""]);
      $scope.tempResult1  = 0;
      $scope.tempResult2  = 0;
      $scope.mytimeout = $timeout($scope.onTimeout,10);
      document.getElementById("resetButton").style.display='none';
      document.getElementById("resetButton2").style.display='none';
        $scope.stop = function(){
            $timeout.cancel($scope.mytimeout);
            document.getElementById("startButton").disabled = false;
            document.getElementById("stopButton").innerHTML = "Paused";
            document.getElementById("startButton").innerHTML = "Resume";
        };

      $scope.onTimeout = function(){
        $timeout.cancel(mytimeout);
      };

      $scope.start = function() {
          if($scope.times[0][0] && $scope.times[0][1]){
              $scope.counter = $scope.counter + 0.01;
              $scope.counter = Math.round($scope.counter * 100) / 100;
              $scope.mytimeout = $timeout($scope.start, 10);
              document.getElementById("startButton").disabled = true;
              document.getElementById("resetButton").disabled = false;
              document.getElementById("resetButton2").disabled = false;
              document.getElementById("stopButton").disabled = false;
              document.getElementById("stopButton").innerHTML = "Stop";
              document.getElementById("startButton").innerHTML = "Started";
              document.getElementById("resetButton").style.display='inline-block';
              document.getElementById("resetButton2").style.display='inline-block';
          }
          else{
              alert("Namen sind erforderlich!!")
          }
      };

      $scope.reset = function(fasterPlayer) {
          switch ($scope.switcher){
              case false:
                  $scope.tempResult1  = $scope.counter.valueOf();
                  $scope.switcher = true;
                  /*if(fasterPlayer == '1')
                  {
                      document.getElementById("resetButton2").disabled = true;
                  }
                  if(fasterPlayer == '2')
                  {
                      document.getElementById("resetButton").disabled = true;
                  }
                  */
                  break;
              case true:
                  $timeout.cancel($scope.mytimeout);
                  $scope.tempResult2  = $scope.counter.valueOf();
                  if(fasterPlayer == 1)
                  {
                      $scope.times.push($scope.tempResult1, $scope.tempResult2);
                  }
                  if(fasterPlayer == 2)
                  {
                      $scope.times.push($scope.tempResult2, $scope.tempResult1);
                      document.getElementById("resetButton").disabled = true;
                  }
                  $scope.counter = 0;
                  document.getElementById("startButton").disabled = false;
                  document.getElementById("stopButton").disabled = true;
                  $scope.switcher = false;
                  document.getElementById("resetButton").style.display='none';
                  document.getElementById("resetButton2").style.display='none';
                  document.getElementById("startButton").innerHTML = "Start";
                  document.getElementById("resetButton").innerHTML = "Spieler 1 ist schneller";
                  break;
          }
      };

      $scope.popLast = function(){
          if($scope.times.length > 1)
          $scope.times.pop();
      }
}]);
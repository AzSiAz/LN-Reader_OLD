angular.module('ln.ChapterCtrl', [])

.controller('ChapterCtrl', function($scope, $stateParams, $ionicHistory, ln, $cordovaDialogs) {
  $scope.title = $stateParams.url.replace(/_/g," ");
  
  ln.chapter($stateParams.url).then(function(res) {
    // $rootElement.append($compile(res)($scope.content));
    $scope.content = res;
  })
  
  $scope.forceRefresh = function() {
    delete $scope.content;
    $scope.$apply(ln.chapter($stateParams.url).then(function(res) {
      $scope.content = res;
    }, function(err) {
      $cordovaDialogs.alert(JSON.stringify(err), "Erreur recuperation détail novel");
    }));
  }
  
  $scope.close = function() {
    $ionicHistory.goBack();
  }
})
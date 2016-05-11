angular.module('ln.FavsCtrl', [])

.controller('FavsCtrl', function($scope, $rootScope, $cordovaDialogs, $ionicScrollDelegate, ln, $ionicFilterBar) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  // $scope.$on('$ionicView.enter', function(e) {
  //   
  // });
  
  var filterBarInstance;

  $scope.showFilterBar = function () {
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.list,
      filterProperties: ['title'],
      update: function (filteredItems, filterText) {
        $scope.list = filteredItems;
      }
    });
  };
  
  $scope.forceRefresh = function() {
    if (filterBarInstance) {
      filterBarInstance();
      filterBarInstance = null;
    }
    delete $scope.list;
    $scope.$apply(ln.favList().then(function(res) {
      $scope.list = res;
      $ionicScrollDelegate.resize()
    }, function(err) {
      alert(JSON.stringify(err));
    }));
  }
  
  $scope.unFav = function(id) {
    ln.deleteFav(id.split("ln_")[1]).then(function(res) {
      window.plugins.OneSignal.deleteTag(res.id.split("fav_")[1].replace(/_/g," "));
      for (var i = 0; i <= $scope.list.length - 1; i++) {
        if ($scope.list[i].title == res.id.split("fav_")[1].replace(/_/g," ")) {
          $scope.list.splice(i, 1);
        }
      }
      $cordovaDialogs.alert("Fav deleted", "Infos");
    }, function(err) {
      $cordovaDialogs.alert("Error", "Infos");
    })
  }
  
  ln.favList().then(function(res) {
    $scope.list = res;
    $ionicScrollDelegate.resize()
  }, function(err) {
    alert(JSON.stringify(err));
  });
      
  $rootScope.$on('Fav:add', function() {
    ln.formattedFav($rootScope.fav).then(function(res) {
      $scope.list.push(res);
      delete $rootScope.fav;
    }, function(err) {
      alert(JSON.stringify(err));
    })
  });
})

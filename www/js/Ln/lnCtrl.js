angular.module('ln.LnCtrl', [])

.controller('LnCtrl', function($scope, $rootScope, ln, $cordovaDialogs, $ionicFilterBar) {
  
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
  
  ln.list(false, "english").then(function(res) {
    $scope.list = res;
  }, function(err) {
    $cordovaDialogs.alert(JSON.stringify(err), "Erreur recuperation liste novel");
  })
  
  $scope.addFav = function(item) {
    ln.createFav(item.split("ln_")[1]).then(function(res) {
      if (res == false) {
        $cordovaDialogs.alert("Already Added", "Fav item");
      }
      else {
        // alert(JSON.stringify(res._id));
        $rootScope.fav = res._id;
        setTimeout(function() {
          window.plugins.OneSignal.sendTag(res._id.split("fav_")[1].replace(/_/g," "), 1);
          $rootScope.$broadcast('Fav:add');
        }, 500);
        // $cordovaDialogs.alert("Fav Added", "Fav item");
      }
    }, function(err) {
      $cordovaDialogs.alert(JSON.stringify(err), "Error fav item");
    })
  };
  
  $scope.forceRefresh = function() {
    // $scope.list = null;
    delete $scope.list;
    
    if (filterBarInstance) {
      filterBarInstance();
      filterBarInstance = null;
    }
    
    $scope.$apply(ln.list(true, "english").then(function(res) {
      $scope.list = res;
    }, function(err) {
      $cordovaDialogs.alert(JSON.stringify(err), "Erreur recuperation liste novel")
    }));
  }
})
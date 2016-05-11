angular.module('ln.LnDetailCtrl', [])

.controller('LnDetailCtrl', function($scope, $stateParams, $cordovaInAppBrowser, $cordovaDialogs, $ionicScrollDelegate, ln, task, $state) {
  
  $scope.title = task.correctTitle(1, $stateParams.LnId.split("ln_")[1].replace(/_/g," "));
  
  $scope.setClass = function(cover) {
    var css = null;
    if (cover !== undefined) {
      css = "item-thumbnail-left";
      return css;
    }
    else {
      css = "";
      return css;
    }
  }
  
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
    $ionicScrollDelegate.resize()
  };
  
  $scope.isGroupShown = function(group) {
    $ionicScrollDelegate.resize();
    return $scope.shownGroup === group;
  };
  
  $scope.chapter = function(array) {
    // alert(JSON.stringify(id));
    var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'yes'
    };
    if (array.linktype == "internal") {
      // var link = "http://netserv.space:3001/chapter/get/" + task.stripUrl("title", array.link);
      // $ionicViewSwitcher.nextDirection('');
      $state.go('chapter', {url: task.stripUrl("title", array.link)});
      // $cordovaInAppBrowser.open(link, '_blank', options).then(function(event) {
      //   $cordovaInAppBrowser.insertCSS({
      //     code: '#mw-navigation{display:none;}.mw-body{margin-left: 0;}#mw-page-base{height: 0;}#footer{display: none;}'
      //   });
      // })
    }
    else {
      $cordovaInAppBrowser.open(array.link, '_blank', options).then(function(event) {
        console.log("success");
      })
    }
  }

  $scope.forceRefresh = function() {
    delete $scope.ln;
    $scope.$apply(ln.getNovelDetail($scope.title, 2).then(function(res) {
      $scope.ln = res;
      $ionicScrollDelegate.resize();
    }, function(err) {
      $cordovaDialogs.alert(JSON.stringify(err), "Erreur recuperation détail novel");
    }));
  }
  
  ln.getNovelDetail($scope.title, 1).then(function(res) {
    $scope.ln = res;
    $ionicScrollDelegate.resize();
  }, function(err) {
    $cordovaDialogs.alert(JSON.stringify(err), "Erreur recuperation détail novel");
  })
})
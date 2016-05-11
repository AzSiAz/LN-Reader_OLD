// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('ln', ['ionic', 'ln.LnCtrl', 'ln.LnDetailCtrl', 'ln.ChapterCtrl', 'ln.FavsCtrl', 'ln.SettingCtrl', 'ln.services', 'ngCordova','pouchdb', 'jett.ionic.filter.bar', 'jett.ionic.scroll.sista'])

.run(function($ionicPlatform, $ionicLoading, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.overlaysWebView(true);
      // StatusBar.styleLightContent();
    }
    
    $rootScope.$on('loading:show', function() {
      $ionicLoading.show({template: 'Loading'})
    })
  
    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide()
    })
  });
})

.config(function($stateProvider, $urlRouterProvider, $provide, $httpProvider) {

  $httpProvider.defaults.timeout = 3000;
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide');
        return response;
      },
      requestError: function (rejection) {
        $rootScope.$broadcast('loading:hide');
        return rejection;
      },
      responseError: function (rejection) {
        $rootScope.$broadcast('loading:hide');
        return rejection;
      }
    }
  })
  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('chapter', {
    url:'/chapter/:url',
    templateUrl: 'templates/ln-chapter.html',
    controller: 'ChapterCtrl'
  })
  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/ln',
    views: {
      'tab-ln': {
        templateUrl: 'templates/tab-ln.html',
        controller: 'LnCtrl'
      }
    }
  })
  .state('tab.ln-detail', {
      url: '/ln/:LnId',
      views: {
        'tab-ln': {
          templateUrl: 'templates/ln-detail.html',
          controller: 'LnDetailCtrl'
        }
      }
    })

  .state('tab.favs', {
      url: '/favs',
      views: {
        'tab-favs': {
          templateUrl: 'templates/tab-favorites.html',
          controller: 'FavsCtrl'
        }
      }
    })
    .state('tab.fav-detail', {
      url: '/favs/:LnId',
      views: {
        'tab-favs': {
          templateUrl: 'templates/fav-detail.html',
          controller: 'LnDetailCtrl'
        }
      }
    })

  .state('tab.setting', {
    url: '/setting',
    views: {
      'tab-setting': {
        templateUrl: 'templates/tab-setting.html',
        controller: 'SettingCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/ln');

});

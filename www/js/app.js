(function() {
  var app = angular.module('queup', ['ionic']);


  app.controller('QueueController', function($scope) {
    $scope.people = [
      {
        name: 'David Cai',
        status: 'waiting in queue'
      },
      {
        name: 'Jon Burt',
        status: 'waiting in queue'
      }
    ];
  });


  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

})();

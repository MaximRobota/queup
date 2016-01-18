(function() {
  var app = angular.module('queup', ['ionic']);


  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('queue', {
      url: '/queue',
      templateUrl: 'templates/queue.html'
    });
    $stateProvider.state('edit', {
      url: '/edit/:personId',
      templateUrl: 'templates/edit.html'
    });

    $urlRouterProvider.otherwise('/queue');
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


  app.controller('QueueController', function($scope, personService) {
    $scope.people = personService.getPeople();

    $scope.add = function() {
      
    };
  });


  app.controller('EditController', function($scope, $state, personService) {
    $scope.person = angular.copy(personService.getPerson($state.params.personId));

    $scope.save = function() {
      personService.updatePerson($scope.person);
      $state.go('queue');
    };

    $scope.delete = function() {
      personService.deletePerson($scope.person.id);
      $state.go('queue');
    };
  });

})();

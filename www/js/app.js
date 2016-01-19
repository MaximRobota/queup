(function() {
  var app = angular.module('queup', ['ionic', 'angularMoment']);


  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('queue', {
      url: '/queue',
      templateUrl: 'templates/queue.html'
    });
    $stateProvider.state('edit', {
      url: '/edit/:personId',
      controller: 'EditController',
      templateUrl: 'templates/edit.html'
    });
    $stateProvider.state('add', {
      url: '/add',
      controller: 'AddController',
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


  app.controller('QueueController', function($scope, $state,queueService) {
    $scope.queue = queueService.getPeople();

    $scope.add = function() {
      $state.go('add');
    };
  });


  app.controller('EditController', function($scope, $state, queueService) {
    $scope.person = angular.copy(queueService.getPerson($state.params.personId));

    $scope.save = function() {
      queueService.updatePerson($scope.person);
      $state.go('queue');
    };

    $scope.delete = function() {
      queueService.deletePerson($scope.person.id);
      $state.go('queue');
    };
  });


  app.controller('AddController', function($scope, $state, queueService) {
    $scope.person = {
      name: '',
      status: 'Added in queue'
    };

    $scope.save = function() {
      queueService.addPerson($scope.person);
      $state.go('queue');
    };
  });

})();

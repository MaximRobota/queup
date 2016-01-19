(function() {
  var app = angular.module('queup', ['ionic', 'angularMoment', 'firebase']);


  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('queue', {
      url: '/queue',
      views: {
        'main': {
          templateUrl: 'templates/queue.html'
        },
        'chat': {
          templateUrl: 'templates/chat.html'
        }
      }
    });
    $stateProvider.state('edit', {
      url: '/edit/:personId',
      views: {
        'main': {
          controller: 'EditController',
          templateUrl: 'templates/edit.html'
        }
      }
    });
    $stateProvider.state('add', {
      url: '/add',
      views: {
        'main': {
          controller: 'AddController',
          templateUrl: 'templates/edit.html'
        }
      }
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


  app.controller('QueueController', function($scope, $state, Queue, Chat) {
    $scope.queue = Queue;
    // $scope.queue.$loaded(function() {
    //   // IF no people is in queue, add one for demo
    //   if ($scope.queue.length === 0) {
    //     $scope.queue.$add({
    //       name: 'David Cai',
    //       status: 'Added to queue',
    //       updatedTime: Firebase.ServerValue.TIMESTAMP
    //     });
    //   }
    // });

    $scope.add = function() {
      $state.go('add');
    };

    $scope.delete = function(person) {
      Queue.$remove(person);
    };

    // $scope.refresh = function() {
    //   $scope.queue = queueService.getPeople();
    //   $scope.$broadcast('scroll.refreshComplete');
    // };
  });


  app.controller('EditController', function($scope, $state, Queue) {
    var person = Queue.$getRecord($state.params.personId);

    // Person working copy
    $scope.person = angular.copy(person);

    $scope.save = function() {
      person.name = $scope.person.name;
      person.status = $scope.person.status;
      person.updatedTime = Firebase.ServerValue.TIMESTAMP;
      Queue.$save(person);
      $state.go('queue');
    };

    $scope.delete = function() {
      Queue.$remove(person);
      $state.go('queue');
    };
  });


  app.controller('AddController', function($scope, $state, Queue) {
    // New person
    $scope.person = {
      name: '',
      status: 'Added in queue'
    };

    $scope.save = function() {
      $scope.person.updatedTime = Firebase.ServerValue.TIMESTAMP;
      Queue.$add($scope.person);
      $state.go('queue');
    };
  });


  app.controller('ChatController', function($scope, Chat) {
    $scope.chat = Chat;
    $scope.chat.$loaded(function() {
      // IF no chat message, add one for demo
      if ($scope.chat.length === 0) {
        $scope.chat.$add({
          name: 'David Cai',
          message: 'Hellow, world!',
          updatedTime: Firebase.ServerValue.TIMESTAMP
        });
      }
    });
  });

})();

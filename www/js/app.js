(function() {
  var app = angular.module('queup', ['ionic', 'angularMoment', 'firebase', 'ngCordova']);


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
    $stateProvider.state('map', {
      url: '/map',
      views: {
        'main': {
          controller: 'MapController',
          templateUrl: 'templates/map.html'
        }
      }
    });
    $stateProvider.state('camera', {
      url: '/camera',
      views: {
        'main': {
          controller: 'CameraController',
          templateUrl: 'templates/camera.html'
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


  app.controller('QueueController', function($scope, $state, $log, Queue, Chat) {

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

    // document.addEventListener('deviceready', function() {
    //   $log.log('Device: ', angular.toJson(device));
    // });

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
          message: 'Hello! The index of this array are asynchronously synchronized with a remote server.',
          updatedTime: Firebase.ServerValue.TIMESTAMP
        });
        $scope.chat.$add({
          name: 'Alex Y',
          message: 'David, stop making things complicate',
          updatedTime: Firebase.ServerValue.TIMESTAMP
        });
      }
    });
  });


  app.controller('MapController', function($scope, $log, $ionicPlatform, $cordovaGeolocation, $cordovaLaunchNavigator) {

    $ionicPlatform.ready(function() {
      $cordovaGeolocation
        .getCurrentPosition({timeout: 10000, enableHighAccuracy: true})
        .then(function (position) {
          $scope.coords = position.coords;

          displayMap($scope.coords);
        },
        function(err) {
          // error
          $log.log('getCurrentPosition error: ' + angular.toJson(err));
        }
      );
    });


    function displayMap(coords) {

      var home = new google.maps.LatLng(coords.latitude, coords.longitude);

      var map = new google.maps.Map(document.getElementById('map-canvas'), {
        // center: {lat: coords.latitude, lng: coords.longitude},
        center: home,
        zoom: 10
      });

      var homeMarker = new google.maps.Marker({
        position: home,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 3
        },
        map: map
      });

      var request = {
        location: home,
        radius: '50000',
        name: 'mutual fund store'
      };

      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, function cbNearbySearch(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          angular.forEach(results, function(place) {
            createMarker(place);
          })
        }
      });

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: place.geometry.location
        });

        marker.addListener('click', function() {
          // map.setZoom(15);
          // map.setCenter(marker.getPosition());

          var destination = [place.geometry.location.lat(), place.geometry.location.lng()];

          $cordovaLaunchNavigator.navigate(
            destination,
            [home.lat(), home.lng()],
            { preferGoogleMaps: true }).then(function() {
              $log.log('Navigator launched');
            }, function(err) {
              $log.error(err);
            });
        });

        return marker;
      }
    } // function displayMap
  });


  app.controller('CameraController', function($scope, $log, $cordovaCamera) {
    $scope.photoUrl = 'http://placehold.it/300x300';

    $scope.takePhoto = function() {
      var options = {
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG
      };
      $cordovaCamera.getPicture(options).then(function(data) {
        $log.log('Image data:', angular.toJson(data));
        $scope.photoUrl = 'data:image/jpeg;base64,' + data;
      }, function(err) {
        $log.error(err);
      });
    };
  });

})();

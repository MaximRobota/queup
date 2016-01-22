(function() {
  var app = angular.module('queup');

  app.factory('Queue', function($firebaseArray) {
    var ref = new Firebase('https://queupapp.firebaseio.com');
    return $firebaseArray(ref);
  });
})();

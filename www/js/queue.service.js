(function() {
  var app = angular.module('queup');

  app.factory('Queue', function($firebaseArray) {
    var ref = new Firebase('https://queup.firebaseio.com/people');
    return $firebaseArray(ref);
  });
})();

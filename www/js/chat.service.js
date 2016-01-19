(function() {
  var app = angular.module('queup');

  app.factory('Chat', function($firebaseArray) {
    var ref = new Firebase('https://queup.firebaseio.com/chat');
    return $firebaseArray(ref);
  });
})();

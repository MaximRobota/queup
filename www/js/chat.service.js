(function() {
  var app = angular.module('queup');

  app.factory('Chat', function($firebaseArray) {
    var ref = new Firebase('https://queupapp2.firebaseio.com/chat');
    return $firebaseArray(ref);
  });
})();

(function() {
  var app = angular.module('queup');

  app.factory('queueService', function() {

    var people = [
      {
        id: '1',
        name: 'David Cai',
        status: 'Added to queue',
        updatedTime: moment().subtract(10, 'minutes')
      },
      {
        id: '2',
        name: 'Jon Burt',
        status: 'Added to queue',
        updatedTime: moment().subtract(5, 'minutes')
      }
    ];

    function indexOf(id) {
      for(var i = 0; i < people.length; i++) {
        if (people[i].id === id) {
          return i;
        }
      }
      return -1;
    }

    return {
      getPeople: function() {
        return people;
      },

      getPerson: function(id) {
        return people[indexOf(id)];
      },

      updatePerson: function(person) {
        person.updatedTime = moment();
        people[indexOf(person.id)] = person;
      },

      deletePerson: function(id) {
        var i = indexOf(id);
        people.splice(i, 1);
      },

      addPerson: function(person) {
        person.id = people.length + 1 + '';
        person.updatedTime = moment();
        people.push(person);
      }
    };
  });

})();

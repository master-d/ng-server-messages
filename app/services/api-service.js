(function(){
  'use strict';
  
  angular.module('sampleApp')
    .factory('apiService', apiService);
  
  function apiService ($q, empty) {
    return {
      post: post
    };
    
    
    
    function post (data) {
      if (Math.floor(Math.random() *2))
        return { data: [ { some: "fake", data: "to return"}] };
      return $q.reject({
        data: getFakeError()
      });
    }
    
    function getFakeError (empty) {
      var fakeErrors = [
        { severity: 1,
          message: "sample global error message",
          field: [ ]
        },
        { severity: 0,
          message: "",
          field: [ { fieldName: "Sample error message for field"} ]
        }
    ];
      
      return fakeErrors[Math.floor(Math.random() * 2)];
    }
  }
  
  apiService.$inject = ['$q'];
  
})();
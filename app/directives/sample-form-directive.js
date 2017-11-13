(function(){
  'use strict';
  
  angular.module('sampleApp')
    .directive('sampleForm', sampleForm);
  
  function sampleForm () {
    return {
      restrict: 'E',
      templateUrl: 'templates/sample-form.html',
      scope: {},
      controller: 'SampleFormController',
      controllerAs: 'ctrl',
      bindToController: true
    };
  }
  
})();
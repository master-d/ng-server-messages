(function(){
  'use strict';
  
  angular.module('sampleApp')
    .directive('apiValidate', apiValidate);
  
  function apiValidate () {
    
    // storage for current API errors, to be removed once model changed
    var errors = [],
      model;
    
    return {
      require: 'ngModel',
      restrict: 'A',
      link: postLink
    };



    function postLink(scope, element, attrs, ngModel) {
      model = ngModel;

      // expose interface to register API error for this field
      model.$registerApiError = registerApiError;

      // add validator to validation loop, that will remove current API errors
      model.$validators.apiValidate = apiValidator;
    }


    function apiValidator () {

      // validation loop, remove all field api errors
      while (errors.length) {
        model.$setValidity(errors.shift(), true);
      }

      // this is fake validator, just return true
      return true;
    }


    function registerApiError (code){
      errors.push(code);

      model.$setValidity(code, false);
    }
  }
  
})();
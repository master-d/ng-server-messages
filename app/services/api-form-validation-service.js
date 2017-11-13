(function(){
  'use strict';
  
  angular.module('sampleApp')
    .factory('ApiFormValidationService', ApiFormValidationService);
  
  function ApiFormValidationService() {
    return {
      applyErrors: applyErrors,
      applyError: applyError,
      reset: reset,
      setInvalid: setInvalid,
      setValid: setValid
    };
  
  
  
    function applyErrors (form, reason) {
      var data = reason.data;
  
      if (!form.$api) {
        reset(form);
      }
  
      // no data returned, fallback to system error
      if (!data) {
        form.$api.$error['global'] = "no data returned from post";
        setInvalid(form);
      }
      else {
        // this is a field
        if (data.field && data.field.length) {
          for (var x=0; x<data.field.length; x++) {
            for (var fname in data.field[x]) {
              form.$api.$error[fname] = data.field[x][fname];
              setInvalid(form);
            }
          }
        } 
        // this is general error not connected to any field
        else {
          form.$api.$error['global'] = data.message;
          setInvalid(form);
        }
  
       // angular.forEach(data.fieldErrors, applyError.bind(null, form));
      }
    }
  
  
    function applyError (form, error) {
      var code = error.code,
        field = error.field,
        api;
        
      if (!form.$api) {
        reset(form);
      }
      
      api = form.$api;
  
      // field does is not able to handle API errors
      if (!form[field] || !form[field].$registerApiError) {
        if (!api.$error[code]) {
          api.$error[code] = [];
        }
  
        api.$error[code].push(field);
        setInvalid(form);
      }
      // field exists and is able to handle API errors
      else {
        form[field].$registerApiError(code);
      }
    }
  
  
    function reset (form){
      form.$api = {
        $error: {},
        $invalid: false,
        $valid: true
      };
    }
  
  
    function setInvalid (form){
      if (!form.$api){
        reset(form);
      }
      
      form.$api.$invalid = true;
      form.$api.$valid = false;
    }
  
  
    function setValid (form){
      if (!form.$api){
        reset(form);
      }
      
      form.$api.$invalid = false;
      form.$api.$valid = true;
    }
  }
  
})();
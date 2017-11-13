(function(){
  'use strict';
  
  angular.module('sampleApp')
    .directive('apiForm', apiForm);
  
  function apiForm (ApiFormValidationService) {
    return {
      require: 'form',
      restrict: 'A',
      link: postLink
    };



    function postLink (scope, element, attrs, formCtrl) {
      var watchPromise = attrs.apiForm || null;
      // prepend message div
      element.prepend("<div class='alert'>hello</div>");
      if(watchPromise){
        scope.$watch(watchPromise, formSubmitted.bind(null, formCtrl));
      }
    }


    function formSubmitted (form, promise) {
      if(!promise || !promise.then){
        return;
      }
      
      ApiFormValidationService.reset(form);

      promise.then(
        null,
        function failure (reason){
          ApiFormValidationService.applyErrors(form, reason);
        }
      );
    }
  }

  apiForm.$inject = ['ApiFormValidationService'];
  
})();
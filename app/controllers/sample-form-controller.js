(function(){
  'use strict';
  
  angular.module('sampleApp')
    .controller('SampleFormController', SampleFormController);
  
  
  function SampleFormController (apiService) {

    // expose denendencies on this
    this.api = apiService;

    // expose data models
    this.formModel = {};
    this.savePromise = null;
  }


  SampleFormController.prototype.save = function (form) {

    // do not send when form is invalid
    if (form.$invalid) {
      return;
    }

    return (this.savePromise = this.api.post(this.formModel));
  }

  SampleFormController.$inject = ['apiService'];
  
})();
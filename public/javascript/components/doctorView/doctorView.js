(function(){
  angular.module('app')
  .component('doctorView', {
    controller:function(){
      console.log('this is the controller for doctorView component');
    },
    template:`
      <h1>doctor view</h1>

      <a ui-sref='login'>Go back to page Home page</a>

    `
  })
})()

(function(){
  angular.module('app')
  .component('pageTwo', {
    controller:function(){
      console.log('this is the controller for the page TWO component');
    },
    template:`
      <h1>Welcome to page 2</h1>
      <a ui-sref='login'>Go back to page 1</a>
    `
  })
})()

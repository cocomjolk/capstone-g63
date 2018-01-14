(function(){
  angular.module('app')
  .component('rewardsView', {
    controller:function(){
      console.log('this is the controller for the page TWO component');
    },
    template:`
      <h1>Welcome to Rewards page</h1>

      <a ui-sref='login'>Go back Home page</a>
    `
  })
})()

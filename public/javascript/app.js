(function(){
  angular.module('app', ['ui.router'])
    .config(config)

    config.$inject = ["$stateProvider", "$urlServiceProvider"]

    function config($stateProvider,$urlServiceProvider) {
      // make your app start at state 'page-one'
      $urlServiceProvider.rules.otherwise({ state: 'login' });

      $stateProvider
      .state('login',{
        url: '/',
        component: 'login'
      })
      .state('page-two',{
        url: '/page-two',
        component: 'pageTwo'
      })
    }

}) ()

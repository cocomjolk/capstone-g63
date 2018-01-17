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
        component: 'login',
        params: {
          user: null
        }
      })
      .state('page-two',{
        url: '/page-two',
        component: 'pageTwo',
        params: {
          user: null
        }
      })
      .state('doctor-view',{
        url: '/doctor-view',
        component: 'doctorView',
        params: {
          user: null
        }
      })
      .state('patient-view',{
        url: '/patient-view',
        component: 'patientView',
        params: {
          user: null
        }
      })
      .state('rewards-view',{
        url: '/rewards-view',
        component: 'rewardsView',
        params: {
          user: null
        }
      })
    }

}) ()

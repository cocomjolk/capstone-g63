(function(){
  angular.module('app', ['ui.router'])
    .config(config)

    config.$inject = ["$stateProvider", "$urlServiceProvider"]

    function config($stateProvider,$urlServiceProvider) {
      // starts app at this pagem
      $urlServiceProvider.rules.otherwise({ state: 'login' });

      $stateProvider
      .state('login',{
        url: '/',
        component: 'login',
        resolve: {
          signedIn: function($window, $state, $http){
            // console.log('delete token');
            // console.log($window.localStorage.getItem('token'));
            $window.localStorage.removeItem('token')
            // console.log('deleted');
              return;
          }
        },
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
        resolve: {
          signedIn: function($window, $state, $http){
            let token = $window.localStorage.getItem('token')
            $http.post('/api/doctors/verify', {token: token})
              .then( response => {
                if (response.data !== "fail") {
                  console.log('from .state("doctor-view")');
                  console.log(response);
                  $window.localStorage.setItem('doctor', JSON.stringify(response.data))
                } else {
                  $state.go('login')
                }
              })
          }
        }
      })
      .state('patient-view',{
        url: '/patient-view',
        component: 'patientView',
        resolve: {
          signedIn: function($window, $state, $http){
            let token = $window.localStorage.getItem('token')
            $http.post('/api/users/verify', {token: token})
              .then( response => {
                if (response.data !== "fail") {
                  console.log('from .state("patient-view")');
                  console.log(response);
                  $window.localStorage.setItem('user', JSON.stringify(response.data))
                } else {
                  $state.go('login')
                }
              })
          }
        },
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

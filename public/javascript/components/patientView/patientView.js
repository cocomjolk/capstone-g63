(function(){
  angular.module('app').component('patientView', {
    controller:function($http, $stateParams, $window){

      const vm = this

      //coming from verify route
      let user = JSON.parse($window.localStorage.getItem('user'))
      vm.id = user.id
      vm.first_name = user.first_name
      vm.img = user.img
      vm.points = user.points

      vm.$onInit = () => {

          $http({
            method: 'GET',
            url: '/api/doctors/id',
            params: {
              id: user.doctor_id
            }
          }).then(function(res) {
              console.log(res.data.first_name);
              console.log(res.data.last_name);
            $http({
              method: 'GET',
              url: '/api/rewards',
              params: {
                doctor_id: user.doctor_id
              }
            }).then(function(res) {
              vm.data = res.data
              console.log('Reward data');
              console.log(vm.data);
            }),
            function errorCallback(res) {}
          }),
          function errorCallback(res) {}
        }
        vm.viewRewards =  () => {
          //only need to change show
        }
    },
    templateUrl: "javascript/components/patientView/patient.html"
  //   template:``
  })
})()

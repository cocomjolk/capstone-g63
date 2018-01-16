(function(){
  angular.module('app').component('doctorView', {
    controller:function ($http, $state) {

      const vm = this

      vm.$onInit = () => {
          //get doctor id from  login so GET route
          //knows which doctor is logged in.
          $http({
            method: 'GET',
            url: '/api/doctors/id',
            params: {
              id: 1
            }
          }).then(function(res) {
            vm.last_name = res.data.last_name
            vm.img = res.data.img
            console.log('doctor data:');
            console.log(res);
            //GET ALL PATIENTS WITH DOCTOR ID
            $http({
              method: 'GET',
              url: '/api/users/doctor_id',
              params: {
                doctor_id: 1
              }
            }).then(function(res) {
              vm.patients = res.data
              console.log('all patients');
              console.log(vm.patients);
              //GET ALL REWARDS
              $http({
                method: 'GET',
                url: '/api/rewards',
                params: {
                  doctor_id: 1
                }
              }).then(function(res) {
                  vm.rewards = res.data
                  console.log('Reward data');
                  console.log(vm.rewards);
                }),
                  function errorCallback(res) {}
            }),
              function errorCallback(res) {}
          }),
            function errorCallback(res) {}
      }









    },
    templateUrl: "javascript/components/doctorView/template.html"



  })
})()

(function(){
  angular.module('app').component('patientView', {
    controller:function($http, $stateParams){

      const vm = this

      // console.log($stateParams);
      //
      // //ALL USER INFO COMING FROM $stateParams from login.js
      // let user = $stateParams.user
      //
      // vm.user = user
      //
      // vm.first_name = user.first_name
      // vm.img = user.img
      // vm.points = user.points
      //
      // console.log(user.first_name);
      // console.log(user.last_name);
      // console.log('points:');
      // console.log(user.points);
      // console.log('Doctor id:');
      // console.log(user.doctor_id);

      vm.$onInit = () => {
          //dont need user info GET request, patient info passed from login
          //keeping for testing bootstrap
          $http({
            method: 'GET',
            url: '/api/users/id',
            params: {
              id: 1

            }
          }).then(function(res) {
            vm.first_name = res.data.first_name
            vm.points = res.data.points
            vm.img = res.data.img
            console.log('patient data:');
            console.log(res);
            $http({
              method: 'GET',
              url: '/api/rewards',
              params: {
                doctor_id: 1
                // user.doctor_id
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
    templateUrl: "javascript/components/patientView/template.html"
  //   template:``
  })
})()

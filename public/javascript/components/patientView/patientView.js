(function(){
  angular.module('app').component('patientView', {
    controller:function($http, $stateParams){

      const vm = this

      //ALL USER INFO COMING FROM $stateParams from login.js
      let user = $stateParams.user

      vm.first_name = user.first_name
      vm.img = user.img
      vm.points = user.points

      console.log(user.first_name);
      console.log(user.last_name);
      console.log('points:');
      console.log(user.points);
      console.log('Doctor id:');
      console.log(user.doctor_id);

      vm.$onInit = () => {
          //dont need user info GET request
          $http({
            method: 'GET',
            url: '/api/users/id',
            params: {
              id: user.id
            }
          }).then(function(res) {
            //console.log('user data:');
            console.log('from first http GET request ');
            console.log(res);
            $http({
              method: 'GET',
              url: '/api/rewards',
              params: {
                doctor_id: 1
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

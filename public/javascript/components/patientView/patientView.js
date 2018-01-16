(function(){
  angular.module('app').component('patientView', {
    controller:function($http, $state){
      
      const vm = this

      vm.$onInit = () => {
          //get patient id form somewhere so GET route
          //knows which patient is logged in.
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
            console.log('user data:');
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

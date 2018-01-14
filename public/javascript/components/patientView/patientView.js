(function(){
  angular.module('app')
  .component('patientView', {
    controller:function($http){
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
            console.log(res);
            $http({
              method: 'GET',
              url: '/api/rewards',
              params: {
                doctor_id: 1
              }
            }).then(function(res) {
              vm.reward_name = res.data.first_name
              vm.reward_points = res.data.points
              vm.img = res.data.img
              console.log(res);
            }),
            function errorCallback(res) {}
          }),
          function errorCallback(res) {}
        }

        vm.viewRewards =  () => {
          $http({
            method: 'GET',
            url: '/api/rewards',
            params: {
              doctor_id: res.doctor_id
            }
          }).then(function(res) {
            vm.reward_name = res.data.first_name
            vm.reward_points = res.data.points
            vm.img = res.data.img
            console.log(res);
          }),
          function errorCallback(res) {}

        }


    },
    templateUrl: "javascript/components/patientView/template.html"
  //   template:``
  })
})()

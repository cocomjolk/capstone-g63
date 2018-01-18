(function(){
  angular.module('app').component('doctorView', {
    controller:function ($http, $stateParams, $window) {

      const vm = this

      vm.showForm = true;
      vm.addRewardForm = false;

      let doctor = JSON.parse($window.localStorage.getItem('doctor'))

      vm.doctor = doctor
      vm.last_name = doctor.last_name
      vm.img = doctor.img

// *******************************************************************************************
       function getRewards() {
        $http({
          method: 'GET',
          url: '/api/rewards',
          params: {
            doctor_id: doctor.id
          }
        }).then(function(res) {
            vm.res = res.data
            console.log(res);
          }),
            function errorCallback(res) {}
      }
      // *******************************************************************************************


      vm.$onInit = () => {
            //GET ALL PATIENTS WITH DOCTOR ID
            $http({
              method: 'GET',
              url: '/api/users/doctor_id',
              params: {
                doctor_id: doctor.id
              }
            }).then(function(res) {
              vm.patients = res.data
              //GET ALL REWARDS
              $http({
                method: 'GET',
                url: '/api/rewards',
                params: {
                  doctor_id: doctor.id
                }
              }).then(function(res) {
                  vm.rewards = res.data
                }),
                  function errorCallback(res) {}
            }),
              function errorCallback(res) {}
      }

    vm.createReward = () => {
      $http({
        method: 'POST',
        url: '/api/rewards',
        data: {
          reward_name: vm.newReward.reward_name,
          reward_points: vm.newReward.reward_points,
          // description: vm.rewards.reward_description,
          img: vm.newReward.img,
          doctor_id: doctor.doctor_id,
        }
      }).then(function(res) {
        //printing whats coming from server
        // console.log("patient json from server")
        // console.log(res);
        delete vm.newReward
      }),
      function errorCallback(response) {
      }
      getRewards();
      vm.addRewardForm = false;
    }

    },
    templateUrl: "javascript/components/doctorView/doctor.html"

  })
})()

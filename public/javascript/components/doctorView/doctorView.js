(function(){
  angular.module('app').component('doctorView', {
    controller:function ($http, $stateParams) {

      const vm = this

      vm.showForm = true;
      vm.addRewardForm = false;

      let doctor_id = 1
      //console.log($stateParams);

      //ALL USER INFO COMING FROM $stateParams from login.js
      // let user = $stateParams.user
      //
      // vm.user = user
      //
      // vm.last_name = user.last_name
      // vm.img = user.img

      // console.log(user.first_name);
      // console.log(user.last_name);
      // console.log('Doctor id:');
      // console.log(user.id);

       function getRewards() {
        $http({
          method: 'GET',
          url: '/api/rewards',
          params: {
            doctor_id: 1
            //user.id
          }
        }).then(function(res) {
            vm.res = res.data
            console.log(res);
          }),
            function errorCallback(res) {}
      }



      vm.$onInit = () => {
          //DONT NEED GET REQUEST
          //Leaving for testing purposes.
          $http({
            method: 'GET',
            url: '/api/doctors/id',
            params: {
              id: 1

            }
          }).then(function(res) {
            let doctor = res.data
            vm.last_name = doctor.last_name
            vm.img = res.data.img
            console.log('doctor data:');
            console.log(res);
            //GET ALL PATIENTS WITH DOCTOR ID
            $http({
              method: 'GET',
              url: '/api/users/doctor_id',
              params: {
                doctor_id: 1
                // user.doctor_id
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
                  //user.id
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

    vm.createReward = () => {
      $http({
        method: 'POST',
        url: '/api/rewards',
        data: {
          reward_name: vm.newReward.reward_name,
          reward_points: vm.newReward.reward_points,
          // description: vm.rewards.reward_description,
          img: vm.newReward.img,
          doctor_id: doctor_id,
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
    templateUrl: "javascript/components/doctorView/template.html"



  })
})()

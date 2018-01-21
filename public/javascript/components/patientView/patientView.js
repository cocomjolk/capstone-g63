(function(){
  angular.module('app').component('patientView', {
    controller:function($http, $stateParams, $window){

      const vm = this

      vm.activityContent = true;
      vm.uploadForm = false;
      vm.rewardContent = false;

      vm.showActivity = function() {
        vm.activityContent = true;
        vm.uploadForm = false;
        vm.rewardContent = false;
      }
      vm.showRewards = function() {
        vm.rewardContent = true;
        vm.activityContent = false;
        vm.uploadForm = false;
      }
      vm.showUpload = function() {
        vm.uploadForm = true;
        vm.activityContent = false;
        vm.rewardContent = false;
      }

      //coming from verify route
      let user = JSON.parse($window.localStorage.getItem('user'))
      console.log(user);
      vm.id = user.id
      vm.first_name = user.first_name
      vm.points = user.points
      if(!user.img){
        vm.img = 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516477110/blank-profile_tasoze.png'
      }else {
        vm.img = user.img
      }


      vm.$onInit = () => {
          $http({
            //GETS DOCTOR ID
            method: 'GET',
            url: '/api/doctors/id',
            params: {
              id: user.doctor_id
            }
          }).then(function(res) {
              // console.log(res.data.first_name);
              // console.log(res.data.last_name);
            //GETS ALL REWARDS WITH DOCTOR ID
            $http({
              method: 'GET',
              url: '/api/rewards',
              params: {
                doctor_id: user.doctor_id
              }
            }).then(function(res) {
              vm.rewards = res.data
              // console.log('Reward data');
              // console.log(vm.rewards);
            }),
            function errorCallback(res) {}
          }),
          function errorCallback(res) {}
        }





        vm.redeemReward = (rewardPoints) => {
          console.log('start of function', user.points);
          console.log('cost of reward: ', rewardPoints);

          //if user does not have enough then message
          //esle redeem reward
          //decucts points from users user
          user.points -= rewardPoints
          //edit user points
          //add to redeemed reward to redeem table
          //with user id, doctor id, reward id,  date
          $http({
            method: 'PUT',
            url: '/api/users/points',
            data: {
              points: user.points,
              id: user.id
            }
          }).then(function(res) {
            console.log('coming from route', res.data.points);
            vm.points = res.data.points
            // console.log('users new points:');
            console.log('users new points: ',vm.points);

          }),
          function errorCallback(res) {}
        }


    },
    templateUrl: "javascript/components/patientView/patient.html"
  //   template:``
  })
})()

(function(){
  angular.module('app').component('patientView', {
    controller:function($http, $stateParams, $window){

      const CLOUDINARY_URL ='https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/hxf6ors9y/image/upload';
      const CLOUDINARY_UPLOAD_PRESET = 'jd099oi8';

      const vm = this

      vm.activityContent = true;
      vm.uploadForm = false;
      vm.rewardContent = false;

      let user;

      vm.$onInit = () => {
        user = JSON.parse($window.localStorage.getItem('user'))
        console.log($window.localStorage.getItem('user'));
        console.log('from patient view', user);
        vm.id = user.id
        vm.first_name = user.first_name
        vm.points = user.points
        if(!user.img){
          vm.img = 'http://res.cloudinary.com/hxf6ors9y/image/upload/v1516477110/blank-profile_tasoze.png'
        }else {
          vm.img = user.img
        }

          $http({
            //GETS DOCTOR ID
            method: 'GET',
            url: '/api/doctors/id',
            params: {
              id: user.doctor_id
            }
          }).then(function(res) {
            vm.doctor_img = res.data.img

            $http({
              method: 'GET',
              url: '/api/rewards',
              params: {
                doctor_id: user.doctor_id
              }
            }).then(function(res) {
              vm.rewards = res.data
              vm.showActivity();
            }),
            function errorCallback(res) {}
          }),
          function errorCallback(res) {}
      }

      vm.showRewards = function() {
        vm.rewardContent = true;
        vm.activityContent = false;
        vm.uploadForm = false;
      }

      vm.showUpload = () => {
        vm.uploadForm = true;
        vm.activityContent = false;
        vm.rewardContent = false;

        let fileUpload = document.getElementById('file-upload');
        fileUpload.addEventListener('change', (event) => {
          let file = event.target.files[0];
          console.log('file from html view:', file);
          let formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
          console.log(formData);
            axios({
            url: CLOUDINARY_URL,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
          }).then(res => {
            //response will contain secure_url
            //This needs to be saved to db to grab later.
            activity_img_url = res.data.secure_url
            $window.localStorage.setItem('activity_img_url', activity_img_url);
            console.log('from patient.js, local storage:');
            console.log($window.localStorage.activity_img_url);
            }).catch(err => {
                console.error(err);
                });
            });
          }



      vm.submitUpload = () => {
        let photo_post = 5;
        user.points += photo_post
        let activity_img = $window.localStorage.getItem('activity_img_url')
        console.log('successfully got activity image from local storage:');
        console.log(activity_img);

        $http({
          method: 'POST',
          url: '/api/activity/upload',
          data: {
            user_id: user.id,
            doctor_id: user.doctor_id,
            activity_points: photo_post,
            activity_action: 'Post',
            activity_name: 'Photo',
            activity_img: activity_img
          }
        }).then(function(res) {
          console.log('activity data', res);


          $http({
            method: 'PATCH',
            url: '/api/users/points',
            data: {
              points: user.points,
              id: user.id
            }
          }).then(function(res) {
            // console.log('coming from route', res.data.points);
            vm.points = res.data.points
        }),
        function errorCallback(response) {}
      }),
      function errorCallback(response) {}
      vm.activityContent = true;
      vm.uploadForm = false;
      vm.rewardContent = false;
      }

// SHOW ACTIVITY BUTTON SHOW ACTIVITY BUTTON SHOW ACTIVITY BUTTON
      vm.showActivity = () => {
        $http({
          method: 'GET',
          url: '/api/activity',
          params: {
            user_id: user.id
          }
        }).then(function(res) {
          vm.activities = res.data
          console.log('activity data from get route', vm.activities);
        }),
        function errorCallback(res) {}
        vm.activityContent = true;
        vm.uploadForm = false;
        vm.rewardContent = false;
      }

      vm.redeemReward = (rewardPoints, reward_id, reward_name) => {
        user.points -= rewardPoints
        $http({
          method: 'PATCH',
          url: '/api/users/points',
          data: {
            points: user.points,
            id: user.id
          }
        }).then(function(res) {
          vm.points = res.data.points
          $http({
            method: 'POST',
            url: '/api/activity/redeem',
            data: {
              user_id: user.id,
              doctor_id: user.doctor_id,
              activity_points: rewardPoints,
              activity_action: 'Redeemed',
              activity_name: reward_name
            }
          }).then(function(res) {
            console.log('activity data', res);

            }),
            function errorCallback(res) {}
        }),
        function errorCallback(res) {}
      }


  },
  templateUrl: "javascript/components/patientView/patient.html"
  })
})()

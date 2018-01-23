(function(){
  angular.module('app').component('doctorView', {
    controller:function ($http, $state, $window) {

      const CLOUDINARY_URL ='https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/hxf6ors9y/image/upload';
      const CLOUDINARY_UPLOAD_PRESET = 'jd099oi8';

      const vm = this

      vm.showPatientsView = true;
      vm.addRewardForm = false;

      let doctor = JSON.parse($window.localStorage.getItem('doctor'))
      vm.doctor = doctor
      vm.last_name = doctor.last_name
      vm.img = doctor.img

      vm.showPatients = () => {
        vm.showPatientsView = true;
        vm.showRewards = false;
      }

// *******************************************************************************************
       vm.getRewards = () => {
         $http({
          method: 'GET',
          url: '/api/rewards',
          params: {
            doctor_id: doctor.id
          }
        }).then(function(res) {
            vm.rewards = res.data
            console.log('running getRewrds function', res.data);
          }),
            function errorCallback(res) {}
            vm.showRewards = true;
            vm.showPatientsView = false;
       }
// *******************************************************************************************

      //GETS ALL PATIENTS AND REWARDS ASSOCITED WITH DOCTOR
      vm.$onInit = () => {
            $http({
              method: 'GET',
              url: '/api/doctors/doctor_id',
              params: {
                doctor_id: doctor.id
              }
            }).then(function(res) {
              vm.patients = res.data
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

// SHOW PATIENT ACTIVITY/ POSTS
            vm.patientActivity = (patient_id) => {
              $http({
                method: 'GET',
                url: '/api/activity',
                params: {
                  user_id: patient_id
                }
              }).then(function(res) {
                vm.activities = res.data
                console.log('activity data from get route:', vm.activities);
              }),
              function errorCallback(res) {}
              vm.activityContent = !vm.activityContent
            }



//ADD REWARD ADD REWARD ADD REWARD ADD REWARD ADD REWARD ADD REWARD ADD REWARD ADD REWARD
      vm.addReward = () => {
        vm.addRewardForm = !vm.addRewardForm

        let fileUpload = document.getElementById('file-upload');
        fileUpload.addEventListener('change', (event) => {
          let file = event.target.files[0];
          console.log(file);
          let formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            axios({
            url: CLOUDINARY_URL,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
          }).then(res => {
            reward_img_url = res.data.secure_url
            $window.localStorage.setItem('reward_img_url', reward_img_url);
            console.log('from doctor view, local storage');
            console.log($window.localStorage.reward_img_url);
            })
          })
      }
      vm.submitReward = () => {
        reward_img_url = $window.localStorage.getItem('reward_img_url', reward_img_url);
        $http({
          method: 'POST',
          url: '/api/rewards',
          data: {
            reward_name: vm.newReward.reward_name,
            reward_points: vm.newReward.reward_points,
            reward_comment: vm.newReward.comment,
            img: reward_img_url,
            doctor_id: doctor.id,
          }
        }).then(function(res) {
          console.log("posted reward from route ", res);
          delete vm.newReward
          vm.getRewards();
        }),
        function errorCallback(response) {}
        vm.addRewardForm = !vm.addRewardForm
      }

},


   templateUrl: "javascript/components/doctorView/doctor.html"

  })
})()

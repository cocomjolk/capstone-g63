(function(){
  angular.module('app').component('doctorView', {
    controller:function ($http, $stateParams, $window) {

      const CLOUDINARY_URL ='https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/hxf6ors9y/image/upload';
      const CLOUDINARY_UPLOAD_PRESET = 'jd099oi8';

      const vm = this

      vm.showForm = true;
      vm.addRewardForm = false;

      let doctor = JSON.parse($window.localStorage.getItem('doctor'))
      console.log(doctor);
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
              url: '/api/doctors/doctor_id',
              params: {
                doctor_id: doctor.id
              }
            }).then(function(res) {
              vm.patients = res.data
              //GET ALL REWARDS WITH DOCTOR ID
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

      vm.addReward = () => {
        let fileUpload = document.getElementById('file-upload');
        fileUpload.addEventListener('change', (event) => {
          let file = event.target.files[0];
          console.log(file);
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
            reward_img_url = res.data.secure_url
            $window.localStorage.setItem('reward_img_url', reward_img_url);
            console.log('from login.js, local storage');
            console.log($window.localStorage.reward_img_url);
            })

      vm.submitReward = () => {
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
          function errorCallback(response) {}
            getRewards();
            vm.addRewardForm() = false;
      }
    })
  }
},


   templateUrl: "javascript/components/doctorView/doctor.html"

  })
})()

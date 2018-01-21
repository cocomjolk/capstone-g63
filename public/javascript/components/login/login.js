(function() {
  angular.module('app').component('login', {
    controller: function($http, $state, $window) {

      const CLOUDINARY_URL ='https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/hxf6ors9y/image/upload';
      const CLOUDINARY_UPLOAD_PRESET = 'jd099oi8';

      const vm = this

      vm.showButtonSignIn = true;
      vm.showButtonNewAccount = true;
      vm.showFormSignIn = false;
      vm.showFormNewAccount = false;
      vm.goBack = false;
      vm.showDropdown = false;

      vm.formGoBack = function() {
        vm.showButtonSignIn = true;
        vm.showButtonNewAccount = true;
        vm.showFormSignIn = false;
        vm.showFormNewAccount = false;
        vm.goBack = false;
      }

      vm.signIn = function() {
        vm.showButtonSignIn = false;
        vm.showButtonNewAccount = false;
        vm.showFormSignIn = true;
        vm.showFormNewAccount = false;
        vm.goBack = true;
      }

      //CREATE NEW ACCOUNT
      vm.newAccount = function() {
        vm.showButtonSignIn = false;
        vm.showButtonNewAccount = false;
        vm.showFormSignIn = false;
        vm.showFormNewAccount = true;
        vm.goBack = true;

        // GETS DOCTORS TO FILL DROP DOWN LIST
        $http({
          method: 'GET',
          url: '/api/doctors'
        }).then(function(res) {
          //used by ng-repeat
          vm.data = res.data
        }),
        function errorCallback(response) {}
        // WAIT FOR IMAGE TO BE UPLOADED
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
            img_url = res.data.secure_url
            $window.localStorage.setItem('img_url', img_url);
            console.log('from login.js, local storage');
            console.log($window.localStorage.img_url);
          }).catch(err => {
            console.error(err);
          });
        });
      }




// LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN
      vm.logIn = function() {

        if (vm.users.patientBox) {
          //coming from form
          console.log(vm.user);
          //Verify user with email and password. bcrypt in patient route.
          $http({
            method: 'POST',
            url: '/api/users/email',
            data: vm.user

          }).then(function(res) {
            console.log('login.js after verify route');
            console.log(res.data);
              if( res.data !== 'fail'){

                vm.showButtonSignIn = true;
                vm.showButtonNewAccount = true;
                vm.showFormSignIn = false;
                vm.showFormNewAccount = false;
                vm.goBack = false;
                $window.localStorage.setItem('token', res.data.token);
                $state.go('patient-view')
              } else {
                console.log('invalid email')
                vm.showAlert = true;
              }
            })

          } else if (vm.users.doctorBox) {
            $http({
              method: 'POST',
              url: '/api/doctors/email',
              data: vm.user

            }).then(function(res) {
              console.log(res.data);
                if( res.data !== 'fail'){
                  console.log('passwords match');
                  vm.showButtonSignIn = true;
                  vm.showButtonNewAccount = true;
                  vm.showFormSignIn = false;
                  vm.showFormNewAccount = false;
                  vm.goBack = false;
                  $window.localStorage.setItem('token', res.data.token);
                  $state.go('doctor-view')
                } else {
                  console.log('invalid email')
                  vm.showAlert = true;
                }
              })
            }
          function errorCallback(response) {}
        }

//CREATING PATIENT PROFILE CREATING PATIENT PROFILE CREATING PATIENT PROFILE CREATING PROFILE
      vm.createProfile = function() {
        vm.showButtonSignIn = true;
        vm.showButtonNewAccount = true;
        vm.goBack = false;

        if (vm.users.patientBox) {
          if(vm.doctor == undefined){
            vm.alert = true;
            console.log('Choose a doctor option');
          }
            let img = $window.localStorage.getItem('img_url')
            console.log('successfully got image from local storage');
            console.log(img);

            $http({
              method: 'POST',
              url: '/api/users',
              data: {
                first_name: vm.users.first_name,
                last_name: vm.users.last_name,
                password: vm.users.password,
                email: vm.users.email,
                phone: vm.users.phone,
                points: 0,
                doctor_id: vm.doctor.id,
                img: img
              }
            }).then(function(res) {
              //res containes token plus user info
              // store token from POST route
              $window.localStorage.setItem('token', res.data.token);
              delete vm.users
              $state.go('patient-view')
            }),
            function errorCallback(response) {}

        }
// CREATING DOCTOR PROFILE CREATING DOCTOR PROFILE CREATING DOCTOR PROFILE CREATING DOCTOR PROFILE
        else if (vm.users.doctorBox) {
          // console.log(vm.users);
          let img = $window.localStorage.getItem('img_url')
          console.log('successfully got image from local storage');
          console.log(img);

          $http({
            method: 'POST',
            url: '/api/doctors',
            data: {
              first_name: vm.users.first_name,
              last_name: vm.users.last_name,
              password: vm.users.password,
              email: vm.users.email,
              phone: vm.users.phone,
              img: img
            }
            //res coming from POST route
          }).then(function(res) {
            // store token from POST route
            $window.localStorage.setItem('token', res.data.token);
            //clear form
            delete vm.users
            $state.go('doctor-view')
          }),
          function errorCallback(response) {}
        }
        vm.showFormNewAccount = false;
      }

    },
    templateUrl: "javascript/components/login/login.html"

  })
})()

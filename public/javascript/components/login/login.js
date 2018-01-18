(function() {
  angular.module('app').component('login', {
    controller: function($http, $state, $stateParams, $window) {
      // console.log('this is the controller for the login view');
      const vm = this

      vm.stateParams = $stateParams

      vm.showButtonSignIn = true;
      vm.showButtonNewAccount = true;
      vm.showFormSignIn = false;
      vm.showFormNewAccount = false;
      vm.goBack = false;
      vm.showDropdown = false;

      vm.signIn = function() {
        vm.showButtonSignIn = false;
        vm.showButtonNewAccount = false;
        vm.showFormSignIn = true;
        vm.showFormNewAccount = false;
        vm.goBack = true;
      }

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
      }

      vm.formGoBack = function() {
        vm.showButtonSignIn = true;
        vm.showButtonNewAccount = true;
        vm.showFormSignIn = false;
        vm.showFormNewAccount = false;
        vm.goBack = false;
      }

// LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN
      vm.logIn = function() {

        if (vm.users.patientBox) {
          console.log(vm.user);

          //Verify user with email and password. bcrypt in route.
          $http({
            method: 'POST',
            url: '/api/users/email',
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
                $state.go('patient-view')
              } else {
                console.log('invalid email')
                vm.showAlert = true;
              }
            })


          } else if (vm.users.doctorBox) {
            $http({
              method: 'GET',
              url: '/api/doctors/email',
              params: {
                email: vm.user.email
              }
            }).then(function(res) {
              if( res.data.password === vm.user.password){
                console.log('passwords match');
                vm.showButtonSignIn = true;
                vm.showButtonNewAccount = true;
                vm.showFormSignIn = false;
                vm.showFormNewAccount = false;
                vm.goBack = false;
                //link to user page using user info from res.data
                vm.goToDoctorView(res.data)
                } else {
                  console.log('invalid email')
                  vm.showAlert = true
                }
              })
            }
          function errorCallback(response) {}
        }

//CREATING PROFILE CREATING PROFILE CREATING PROFILE CREATING PROFILE
      vm.createProfile = function() {
        vm.showButtonSignIn = true;
        vm.showButtonNewAccount = true;
        vm.goBack = false;
        if (vm.users.patientBox) {
          if(vm.doctor == undefined){
            vm.alert = true;
            console.log('Choose a doctor option');
          }
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
              img: vm.users.img
            }
          }).then(function(res) {
            // store token from POST route
            $window.localStorage.setItem('token', res.data.token);
            delete vm.users
            $state.go('patient-view')
          }),
          function errorCallback(response) {}
        }
        else if (vm.users.doctorBox) {
          // console.log(vm.users);
          $http({
            method: 'POST',
            url: '/api/doctors',
            data: {
              first_name: vm.users.first_name,
              last_name: vm.users.last_name,
              password: vm.users.password,
              email: vm.users.email,
              phone: vm.users.phone,
              img: vm.users.img
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

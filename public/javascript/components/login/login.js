(function() {
  angular.module('app').component('login', {
    controller: function($http, $state) {
      // console.log('this is the controller for the login view');
      const vm = this

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
          //printing whats coming from server
          // console.log("All doctors json from server")
          // console.log(res.data);
          // vm.drRios = res.data[0].last_name
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

      vm.goToPatientView = function () {
        $state.go('patient-view')
      }

      vm.goToDoctorView = function (data) {
        console.log(data);
        $state.go('doctor-view', data)
      }

      // NEED TO INCORPORATE WITH AUTH/BCRYPT
      vm.logIn = function() {
        vm.showButtonSignIn = true;
        vm.showButtonNewAccount = true;
        vm.showFormSignIn = false;
        vm.showFormNewAccount = false;
        vm.goBack = false;
        if (vm.users.patientBox) {
          $http({
            method: 'GET',
            url: '/api/users/email',
            params: {
              email: vm.user.email
            }
          }).then(function(res) {
            //prints user info from "users" db
            res.data.id// console.log(res);
            // console.log(res.data.first_name);
            if( res.data.password === vm.user.password){
              console.log('passwords match');
              //got to user page
              //link to user page passing user id
              console.log(res.data.id);
              vm.goToPatientView(res.data)
            } else {
              console.log('invalid email')
              vm.invalidEmail = "Invalid Email or Password"
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
              //prints doctor info from "doctors" db
              console.log(res);
              console.log('Dr. ' + res.data.last_name);
              if( res.data.password === vm.user.password){
                console.log('passwords match');
                //got to user page
                //link to user page passing user id
                vm.goToDoctorView()
                } else {
                  console.log('invalid email')
                  vm.invalidEmail = "Invalid Email or Password"
                }
              })
            }
          function errorCallback(response) {}
        }


      vm.createProfile = function() {
        vm.showButtonSignIn = true;
        vm.showButtonNewAccount = true;

        vm.goBack = false;
        // console.log(vm.users);
        if (vm.users.patientBox) {
          if(!vm.doctor.id){
            console.log('Choose a doctor option');
          }
          console.log(vm.doctor.id);
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
            //printing whats coming from server
            // console.log("patient json from server")
            console.log(res);
            delete vm.users
          }),
          function errorCallback(response) {}
        }
        else if (vm.users.doctorBox) {
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
          }).then(function(res) {
            //printing whats coming from server
            console.log("docotr json from server")
            console.log(res);
            delete vm.users
          }),
          function errorCallback(response) {}
        }
        vm.showFormNewAccount = false;
      }

    },
    templateUrl: "javascript/components/login/template.html"

  })
})()

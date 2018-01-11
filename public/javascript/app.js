(function() {
  'use strict'

  console.log('booyah from public/javascript/app.js');
  angular.module("app", [])
    .component('recovery', {
      controller: function ($http) {
        const vm = this

        vm.showButtonSignIn = true;
        vm.showButtonNewAccount = true;
        vm.showFormSignIn = false;
        vm.showFormNewAccount = false;
        vm.goBack = false

        vm.signIn = function(){
          vm.showButtonSignIn = false;
          vm.showButtonNewAccount = false;
          vm.showFormSignIn = true;
          vm.showFormNewAccount = false;
          vm.goBack = true;
        }
        vm.newAccount = function(){
          vm.showButtonSignIn = false;
          vm.showButtonNewAccount = false;
          vm.showFormSignIn = false;
          vm.showFormNewAccount = true;
          vm.goBack = true;
        }
        vm.formGoBack = function(){
          vm.showButtonSignIn = true;
          vm.showButtonNewAccount = true;
          vm.showFormSignIn = false;
          vm.showFormNewAccount = false;
          vm.goBack = false;
        }
        vm.logIn = function(){
          vm.showButtonSignIn = true;
          vm.showButtonNewAccount = true;
          vm.showFormSignIn = false;
          vm.showFormNewAccount = false;
          vm.goBack = false;
          if (vm.users.patientBox){
            console.log(vm.users);
            delete vm.users
          } else if (vm.users.doctorBox) {
            console.log(vm.users);
            delete vm.users
          } else if (vm.users.patientBox === vm.users.doctorBox) {
            console.log('check one box');
          }
        }
        vm.createProfile = function(){
          vm.showButtonSignIn = true;
          vm.showButtonNewAccount = true;
          vm.showFormNewAccount = false;
          vm.goBack = false;
          if (vm.users.patientBox){
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
                doctor_id: 0,
                img: vm.users.img,
              }
            }).then(function(res) {
                console.log(res);
                }),
              function errorCallback(response) {
              }
          }
          else if (vm.users.doctorBox) {
              console.log('POST to doctors');
              console.log(vm.users);
              delete vm.users
          }
          else if (vm.users.patientBox === vm.users.doctorBox) {
            console.log('check one box');
          }
        }

      },

      templateUrl: "template.html"
      // template: `
      //       <h1>from app.js template: html</h1>
      //   `

    })
}());

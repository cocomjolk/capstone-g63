(function() {

  'use strict'

  console.log('booyah');
  angular.module("app", [])
    .component('recovery', {
      controller: function () {
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
          console.log('signIn test');
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




        vm.createProfile = function(){
          console.log('test');
          vm.showForm = false;
        }

      },

      templateUrl: "template.html"
      // template: `
      //       <h1>from app.js template: html</h1>
      //   `

    })
}());

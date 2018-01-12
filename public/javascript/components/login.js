(function() {
  angular.module('app').component('login', {
    controller: function($http) {
      console.log('this is the controller for the login view');
      const vm = this

      vm.showButtonSignIn = true;
      vm.showButtonNewAccount = true;
      vm.showFormSignIn = false;
      vm.showFormNewAccount = false;
      vm.goBack = false

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
      }
      vm.formGoBack = function() {
        vm.showButtonSignIn = true;
        vm.showButtonNewAccount = true;
        vm.showFormSignIn = false;
        vm.showFormNewAccount = false;
        vm.goBack = false;
      }
      vm.logIn = function() {
        vm.showButtonSignIn = true;
        vm.showButtonNewAccount = true;
        vm.showFormSignIn = false;
        vm.showFormNewAccount = false;
        vm.goBack = false;
        if (vm.users.patientBox) {
          console.log(vm.users);
          delete vm.users
        } else if (vm.users.doctorBox) {
          console.log(vm.users);
          delete vm.users
        } else if (vm.users.patientBox === vm.users.doctorBox) {
          console.log('check one box');
        }
      }
      vm.createProfile = function() {
        vm.showButtonSignIn = true;
        vm.showButtonNewAccount = true;
        vm.showFormNewAccount = false;
        vm.goBack = false;

        if (vm.users.patientBox) {
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
              img: vm.users.img
            }
          }).then(function(res) {

            console.log(res);
            delete vm.users
          }),
          function errorCallback(response) {}
        } else if (vm.users.doctorBox) {
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
            console.log(res);
          }),
          function errorCallback(response) {}
        } else if (vm.users.patientBox === vm.users.doctorBox) {
          console.log('check one box');
        }
      }
    },
    template: `

    <a ui-sref='page-two'>Page 2</a>



    <nav id="header" class="navbar navbar-default">
      <div class="navbar-brand">Recovery Plus</div>
      <div>
        <a class="btn btn-info" ng-click="$ctrl.signIn()" ng-show="$ctrl.showButtonSignIn">LOG IN</a>
        <a class="btn btn-info" ng-click="$ctrl.newAccount()" ng-show="$ctrl.showButtonNewAccount">SIGN UP</a>
      </div>
      <div>
        <p><a class="btn btn-info" ng-click="$ctrl.formGoBack()" ng-show="$ctrl.goBack">Go Back</a></p>
      </div>
      <div>
      </div>
    </nav>

    <!-- SIGN IN FORM SIGN IN FORM SIGN IN FORM SIGN IN FORM SIGN IN FORM SIGN IN FORM   -->

      <div ng-show="$ctrl.showFormSignIn">
        <!--  <div class="col-md-8"> -->
          <form ng-submit="$ctrl.logIn()">
            <div class="form-group">

            <div class="form-check form-check-inline">
              <input ng-model="$ctrl.users.patientBox" class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
              <label class="form-check-label" for="inlineCheckbox1">Patient</label>

              <input ng-model="$ctrl.users.doctorBox" class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
              <label class="form-check-label" for="inlineCheckbox2">Doctor</label>
            </div>
          </br>

          <div class="input-group">
             <span class="input-group-addon">Email</span>
             <input ng-model="$ctrl.users.email" id="email" class="form-control" placeholder="Valid email format is example@domain.com" required/>
          </div>
            </br>
          <div class="input-group">
             <span class="input-group-addon">Password</span>
             <input ng-model="$ctrl.users.password" id="password" class="form-control" placeholder="Enter Password" required/>
          </div>

          <br>
            <button  type="submit" class="btn btn-primary btn-lg btn-block">Sign In</button>
          </div>
          </form>
        </div>
      <!-- SIGN IN FORM SIGN IN FORM SIGN IN FORM SIGN IN FORM SIGN IN FORM SIGN IN FORM   -->

    <!-- NEW ACCOUNT FORM NEW ACCOUNT FORM NEW ACCOUNT FORM NEW ACCOUNT FORM  -->
    <div ng-show="$ctrl.showFormNewAccount">
      <!--  <div class="col-md-8"> -->
        <form ng-submit="$ctrl.createProfile()">

          <div class="form-check form-check-inline">
            <input ng-model="$ctrl.users.patientBox" class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
            <label class="form-check-label" for="inlineCheckbox1">Patient</label>

            <input ng-model="$ctrl.users.doctorBox" class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
            <label class="form-check-label" for="inlineCheckbox2">Doctor</label>
          </div>
        </br>

        <div class="input-group">
           <span class="input-group-addon">First Name</span>
           <input ng-model="$ctrl.users.first_name" id="first_name" class="form-control" placeholder="Enter First Name" required/>
        </div>
          </br>
        <div class="input-group">
           <span class="input-group-addon">Last Name</span>
           <input ng-model="$ctrl.users.last_name" id="last_name" class="form-control" placeholder="Enter Last Name" required/>
        </div>
          </br>
        <div class="input-group">
           <span class="input-group-addon">Email</span>
           <input ng-model="$ctrl.users.email" id="email" class="form-control" placeholder="Valid email format is example@domain.com" required/>
        </div>
          </br>
        <div class="input-group">
           <span class="input-group-addon">Phone</span>
           <input ng-model="$ctrl.users.phone" id="phone" class="form-control" placeholder="Enter Phone Number" required/>
        </div>
          </br>
        <div class="input-group">
           <span class="input-group-addon">Image URL</span>
           <input ng-model="$ctrl.users.img" id="img" class="form-control" placeholder="Enter Image URL" required/>
        </div>
          </br>
        <div class="input-group">
           <span class="input-group-addon">Password</span>
           <input ng-model="$ctrl.users.password" id="password" class="form-control" placeholder="Enter Password" required/>
        </div>
          </br>
        <div class="input-group">
           <span class="input-group-addon">Confirm Password</span>
           <input ng-model="$ctrl.users.password" id="password" class="form-control" placeholder="Re-Enter Password" required/>
        </div>

        <div class="form-group">
        <br>
          <button  type="submit" class="btn btn-primary btn-lg btn-block">Create Account</button>
        </div>
      </form>
    </div>

    <!-- NEW ACCOUNT FORM NEW ACCOUNT FORM NEW ACCOUNT FORM NEW ACCOUNT FORM   -->



    `
  })
})()

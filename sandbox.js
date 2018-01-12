
// Define routes
function config($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider
    .state({
      name: 'home',
      url: '/',
      component: 'app',
    })
}

//to link to a route
$stateProvider
  .state({ name: 'orders', url: '/my-orders', component: 'orders' })
  .state({ name: 'cart', url: '/my-cart', component: 'cart' })

  <a ui-sref="cart">My Cart</a>


//Navigate to a route
  // controller.$inject = ['$state']


//
function controller($state) {
  const vm = this

  vm.navigate = function (e) {
    e.preventDefault()
    $state.go('home')
  }
}

//*****************************************************************************

(function() {
  'use strict'

  angular.module('app')
    .component('postEdit', {
      templateUrl: '/js/posts/post-edit.template.html',
      controller: controller
    })

  controller.$inject = ['$http', '$stateParams', '$state']
  function controller($http, $stateParams, $state) {
    const vm = this

    vm.$onInit = onInit
    vm.updatePost = updatePost

    function onInit() {
      $http.get(`/api/posts/${$stateParams.id}`)
        .then(response => {
          vm.post = response.data
          $http.get(`/api/posts/${$stateParams.id}/comments`)
            .then(response => {
              vm.post.comments = response.data
            })
        })
    }

    function updatePost() {
      $http.patch(`/api/posts/${$stateParams.id}`, vm.post)
        .then(response => {
            $state.go('posts')
        })
    }

  }

}());
//****************************************************************
controller.$inject = ['$http']
  function controller($http) {
    const vm = this

    vm.$onInit = onInit
    vm.addExpense = addExpense
    vm.deleteExpense = deleteExpense
    vm.editExpense = editExpense
    vm.updateExpense = updateExpense

    function onInit() {
      $http.get('/api/expenses').then(function (response) {
        vm.expenses = response.data
      })
    }

    function addExpense() {
      $http.post('/api/expenses', vm.expense)
        .then(function (response) {
          vm.expenses.push(response.data)
          delete vm.expense
        })
    }

    function updateExpense() {
      $http.patch(`/api/expenses/${vm.editingExpense.id}`, vm.editingExpense)
        .then(function (response) {
          const expense = response.data
          const originalExpense = vm.expenses.find(e => e.id == expense.id)
          Object.assign(originalExpense, expense)
          delete vm.editingExpense
        })
    }

    function deleteExpense(e, expense) {
      e.preventDefault()
      $http.delete(`/api/expenses/${expense.id}`)
        .then(function () {
          vm.expenses.splice(vm.expenses.indexOf(expense))
        })
    }

    function editExpense(e, expense) {
      e.preventDefault()
      vm.editingExpense = angular.copy(expense)
    }
  }

}());

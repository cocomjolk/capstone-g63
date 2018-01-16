
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
$http({
  method: 'GET',
  url: '/api/rewards',
  params: {
    propertyName: 1
  }
}).then(function(res) {
  }),
    function errorCallback(res) {}

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


$stateProvider
  .state({ name: 'orders', url: '/my-orders', component: 'orders' })
  .state({ name: 'cart', url: '/my-cart', component: 'cart' })


//to link to a route
  <a ui-sref="cart">My Cart</a>


//Navigate to a route
  controller.$inject = ['$state']

function controller($state) {
  const vm = this

  vm.navigate = function (e) {
    e.preventDefault()
    $state.go('home')
  }
}

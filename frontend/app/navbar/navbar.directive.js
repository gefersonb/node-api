(function() {

  'use strict';

  angular
    .module('app')
    .directive('navbar', navbar);

  function navbar() {
    return {
      templateUrl: 'app/navbar/navbar.html',
      controller: navbarController,
      controllerAs: 'vm'
    }
  }

  navbarController.$inject = ['authService', 'navbarService'];

  function navbarController(authService, navbarService) {
    var vm = this;
    vm.auth = authService;
    vm.navbar = navbarService;
    vm.navbar.loading=false;
    vm.navbar.loggedUser = 'Efetue login';
  }

})();

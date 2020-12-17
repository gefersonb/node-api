(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', homeController);

  homeController.$inject = ['authService', '$interval'];

  function homeController(authService, $interval) {

    var vm = this;
    vm.auth = authService;
    vm.position = ' ';

/*
    navigator.geolocation.getCurrentPosition(
      position => {
        vm.position = ' ' + position.coords.latitude + ';' + position.coords.longitude;
      }
    );

    vm.updatePosition = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          debugger;
          vm.position = ' ' + position.coords.latitude + ';' + position.coords.longitude;
          //return ' ' + position.coords.latitude + ';' + position.coords.longitude;
          console.log(vm.position);
        }
      );
    };

    setInterval(vm.updatePosition(), 2000);



    vm.updatePosition = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          vm.position = ' ' + position.coords.latitude + ';' + position.coords.longitude;
          //return ' ' + position.coords.latitude + ';' + position.coords.longitude;
          console.log(vm.position);
        }
      );
    }

    $interval(vm.updatePosition, 1000);
    */

  }

})();

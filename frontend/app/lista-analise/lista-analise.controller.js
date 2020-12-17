(function() {
  "use strict";

  angular
    .module("app")
    .controller("ListaAnaliseController", ListaAnaliseController);

  ListaAnaliseController.$inject = [ "$stateParams", "CreditoService", "$state", "authService", "navbarService" ];

  function ListaAnaliseController($stateParams, CreditoService, $state, authService, navbarService) {
    var vm = this;
    vm.auth = authService;
    vm.pessoas;
    vm.navbar = navbarService;
    vm.navbar.loading = true;

    vm.formData = {};
    vm.title = $stateParams.title;
    vm.listIndex = $stateParams.listIndex;
    vm.pessoa = $stateParams.pessoa;
    vm.erro;

    if(vm.listIndex == 2)
      CreditoService.listarAnalise(vm.pessoa).then(handleListarPessoas, handleError);
    else {
      vm.listIndex = 1;
      CreditoService.listarTodos().then(handleListarPessoas, handleError);
    }
    vm.listIndex = 1;

    function handleExcluirPessoa(r) {
      vm.navbar.loading = false;
      vm.navbar.erro = 'Exclusão realizada com sucesso';
      vm.pessoas = r.data;
    }

    function handleListarPessoas(r) {
      vm.navbar.loading = false;
      vm.analises = r.data;
    }

    function handleError(e) {
      vm.navbar.loading = false;
      vm.erro = 'Não foi possível conectar ao servidor';
      if(e.data)
        vm.erro = e;
    }


  }
})();

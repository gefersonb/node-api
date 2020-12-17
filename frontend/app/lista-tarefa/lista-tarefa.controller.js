(function() {
  "use strict";

  angular
    .module("app")
    .controller("ListaTarefaController", ListaTarefaController);

  ListaTarefaController.$inject = [ "$stateParams", "$state", "TarefaService", "navbarService" ];

  function ListaTarefaController($stateParams, $state, TarefaService, navbarService) {
    var vm = this;
    vm.title = 'Teste consumo REST';
    vm.navbar = navbarService;
    vm.navbar.loading = true;
    vm.erro;

    TarefaService.listar().then(handleListarPessoas, handleError);



    function handleListarPessoas(r) {
      vm.navbar.loading = false;
      vm.tarefas = r.data;
      console.log(r);
    }

    function handleError(e) {
      vm.navbar.loading = false;
      vm.erro = 'Não foi possível conectar ao servidor';
      if(e.data)
        vm.erro = e;

    }


  }
})();

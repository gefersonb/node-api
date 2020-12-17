(function() {
  "use strict";

  angular
    .module("app")
    .controller("ListaPessoasController", ListaPessoasController);

  ListaPessoasController.$inject = [ "$stateParams", "ListaPessoasService", "$state", "authService", "navbarService" ];

  function ListaPessoasController($stateParams, ListaPessoasService, $state, authService, navbarService) {
    var vm = this;
    vm.auth = authService;
    vm.pessoas;
    vm.navbar = navbarService;
    vm.navbar.loading = true;

    ListaPessoasService.listar().then(handleListarPessoas, handleError);

    vm.formData = {};
    vm.title = $stateParams.title;
    vm.erro;

    vm.editarPessoa = (p) => {
      $state.go('cadastro-pessoa', {
				pessoa : p
			});
    }

    vm.avaliacaoCredito = (p) => {
      $state.go('cadastro-pessoa', {
				pessoa : p,
        avaliarCredito : true
			});
    }

    vm.listarAvaliacao = (p) => {
      $state.go('lista-analise', {
				pessoa : p,
        listIndex : 2
			});
    }

    vm.delete = (p) => {
      vm.navbar.loading = true;
      ListaPessoasService.excluir(p).then(handleExcluirPessoa, handleError);
    }

    vm.novoCadastro = () => {
      $state.go('cadastro-pessoa');
    }

    function handleExcluirPessoa(r) {
      vm.navbar.loading = false;
      vm.navbar.erro = 'Exclusão realizada com sucesso';
      vm.pessoas = r.data;
    }


    function handleListarPessoas(r) {
      vm.navbar.loading = false;
      vm.pessoas = r.data;
    }

    function handleError(e) {
      if(e.data && e.data[0] && e.data[0].co_retorno && e.data[0].co_retorno == "2000") {
        vm.navbar.loading = false;
        vm.erro = 'Não é permitido excluir após realização de análise de crédito para o cliente';
      }else {
        vm.navbar.loading = false;
        vm.erro = 'Não foi possível conectar ao servidor';
        if(e.data)
          vm.erro = e;
      }
    }


  }
})();

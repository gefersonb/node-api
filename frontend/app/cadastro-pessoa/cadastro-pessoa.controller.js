(function() {
  "use strict";
  angular
    .module("app")
    .controller("CadastroPessoaController", CadastroPessoaController);

  CadastroPessoaController.$inject = [ "$stateParams", "ListaPessoasService", "authService", "$state",  "navbarService", "CreditoService"];

  function CadastroPessoaController($stateParams, ListaPessoasService, authService, $state, navbarService, CreditoService) {
    var vm = this;
    vm.auth = authService;
    vm.navbar = navbarService;
    vm.formData = {};
    vm.title = $stateParams.title;
    vm.erro;
    vm.action = 'Cadastrar';

    vm.formData.sexo = '?';
    vm.formData.ecivil = '?';
    vm.formData.uf = '?';

    let pessoa = $stateParams.pessoa;
    let avaliarCredito = $stateParams.avaliarCredito;

    if(pessoa){
      vm.formData = pessoa;
      vm.action = 'Atualizar';
    }

    vm.cadastrarPessoa = () => {
      vm.formData.naturalidade = 'nao informado';
      vm.formData.nacionalidade = 'nao informado';
      if (!vm.formData.dependentes)
        vm.formData.dependentes = 0;
      vm.erro = '';
      vm.navbar.loading = true;
      ListaPessoasService.cadastrar(vm.formData).then(handleCadastrarPessoa, handleError);
    }

    vm.isAvaliarCredito = () => {
      return avaliarCredito;
    }

    vm.avaliacaoCredito = () => {
      vm.erro = '';
      vm.navbar.loading = true;
      CreditoService.solicitarAvaliacao(vm.formData).then(handleAnaliseCredito, handleError);
    }

    function handleCadastrarPessoa(r) {
      vm.navbar.loading = false;
      $state.go('lista-pessoas');
    }

    function handleAnaliseCredito(r) {
      vm.navbar.loading = false;
      $state.go('lista-analise',{
				pessoa : vm.formData,
        listIndex : 2
			});
    }

    function handleError(e) {
      vm.navbar.loading = false;
      vm.erro = 'Não foi possível conectar ao servidor';
      if(e.data)
        vm.erro = e.data[0].ds_field + " " + e.data[0].ds_valor + " " + e.data[0].ds_retorno;
    }

  }
})();

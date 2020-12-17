(function() {
  "use strict";
  angular
    .module("app")
    .controller("LoginController", LoginController);

  LoginController.$inject = [ "$stateParams", "LoginService", "authService", "$state", "navbarService" ];

  function LoginController($stateParams, LoginService, authService, $state, navbarService) {
    var vm = this;
    vm.auth = authService;
    vm.navbar = navbarService;
    vm.formData = {};
    vm.title = $stateParams.title;
    vm.erro;
    vm.confirmar = false;
    vm.texto = 'Criar novo';
    vm.action = vm.texto;

    vm.criarNovo = () => {
      if(vm.confirmar){
		  console.log(vm.formData);
        if(vm.formData.senha == vm.formData.confirmaSenha){
          vm.erro = '';
          vm.navbar.loading = true;
          LoginService.cadastrar(vm.formData).then(handleCriarNovo,handleErrorCriarNovo);
          vm.confirmar = false;
          vm.action = vm.texto;
          vm.erro = false;
        }else{
          vm.erro = 'Por favor confirme a senha';
        }
      }else{
        vm.navbar.loading = false;
        vm.confirmar = true;
        vm.action = 'Confirmar';
        vm.erro = '';
      }
    }

    vm.login = () => {
      vm.erro = '';
      vm.navbar.loading = true;
      LoginService.login(vm.formData).then(handleLogin,handleError);
    }

    function handleError(e) {
      vm.navbar.loading = false;
      vm.erro = 'Não foi possível conectar ao servidor';
      if(e.data)
        vm.erro = e;
		}

		function handleLogin(r) {
      vm.navbar.loading = false;
      if(r.data.codigo){
        vm.navbar.usuario = r.data.usuario;
        vm.auth.authTecnico();
        $state.go('home');
      } else {
        vm.erro = 'Usuário ou Senha inválido.';
      }
		}

    function handleErrorCriarNovo(e) {
      vm.navbar.loading = false;
      vm.erro = 'Não foi possível conectar ao servidor';
      if(e.data)
        vm.erro = e.data[0].ds_field + " " + e.data[0].ds_valor + " " + e.data[0].ds_retorno;
    }

    function handleCriarNovo(r) {
      vm.navbar.loading = false;
      vm.erro = 'Usuário ' + vm.formData.usuario + ' cadastrado com sucesso';
    }

  }
})();

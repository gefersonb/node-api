(function () {

  'use strict';

  angular
    .module('app', ['auth0.auth0', 'ui.router', 'angular-jwt'])
    .config(config);

  config.$inject = [
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
    'angularAuth0Provider',
    '$provide',
    '$httpProvider'
  ];

  function config(
    $stateProvider,
    $locationProvider,
    $urlRouterProvider,
    angularAuth0Provider,
    $provide,
    $httpProvider
  ) {

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'app/home/home.html',
        controllerAs: 'vm'
      })
      .state('lista-pessoas', {
        params: {
          title: 'Listagem de pessoas'
        },
        url: '/lista-pessoas',
        controller: 'ListaPessoasController',
        templateUrl: 'app/lista-pessoas/lista-pessoas.html',
        controllerAs: 'spp'
      })
      .state('cadastro-pessoa', {
        params: {
          title: 'Cadastro de pessoas',
          pessoa: undefined,
          avaliarCredito: false
        },
        url: '/cadastro-pessoa',
        controller: 'CadastroPessoaController',
        templateUrl: 'app/cadastro-pessoa/cadastro-pessoa.html',
        controllerAs: 'spp'
      })
      .state('lista-analise', {
        params: {
          title: 'Listagem Análise de Crédito',
          listIndex: 1,
          pessoa: null
        },
        url: '/lista-analise',
        controller: 'ListaAnaliseController',
        templateUrl: 'app/lista-analise/lista-analise.html',
        controllerAs: 'spp'
      })
      .state('lista-tarefa', {
        params: {
          title: 'Listagem de Tarefas',
          listIndex: 1,
          tarefa: null,
          usuario: null
        },
        url: '/lista-tarefa',
        controller: 'ListaTarefaController',
        templateUrl: 'app/lista-tarefa/lista-tarefa.html',
        controllerAs: 'spp'
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'app/login/login.html',
        controllerAs: 'vm'
      })
      .state('callback', {
        url: '/callback',
        controller: 'CallbackController',
        templateUrl: 'app/callback/callback.html',
        controllerAs: 'vm'
      });

    angularAuth0Provider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      responseType: 'token id_token',
      redirectUri: AUTH0_CALLBACK_URL,
      scope: 'openid'
    });

    $urlRouterProvider.otherwise('/');

    $locationProvider.hashPrefix('');

    $locationProvider.html5Mode(true);

    // register the interceptor as a service
		$provide.factory('Interceptor', ['$q', '$location', 'SessionService', function($q, $location, SessionService) {
		  return {

			// optional method
		    'request': function(config) {
		    	return config;
		    },

		    // optional method
		   'requestError': function(rejection) {
			   if (canRecover(rejection)) {
					return responseOrNewPromise
				}
				return $q.reject(rejection);
		    },

		    // optional method
		    'response': function(response) {
          var token = response.headers()['authorization'];
				if (token !== undefined) {
					SessionService.setToken(token);
					$httpProvider.defaults.headers.common.Authorization = 'Bearer '
							+ token;
				}
				return response || $q.when(response);
		    },

		    // optional method
		   'responseError': function(rejection) {
			   if (rejection.status === 401) {
					SessionService.removeToken();
					$location.path('/login');
			   }
			   return $q.reject(rejection);
		    }
		  };

		}]);

		$httpProvider.interceptors.push('Interceptor');

  }

})();

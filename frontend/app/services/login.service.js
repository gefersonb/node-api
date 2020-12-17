(function() {
	'use strict';

	angular.module('app').service('LoginService', LoginService);

	LoginService.$inject = [ '$http'];

	function LoginService($http) {

		return ({
			login,
			cadastrar
		});

		function login(p) {
			/*
			let req = {
				method: 'get',
				url: 'http://' + SERVER_URL + ':' + SERVER_PORT + '/rest/rest/integracao/usuario/' + p.usuario + '/' + p.senha,
				headers: {'Content-Type': 'application/json'}
			};


			return $http(req);
			*/
			//p.confirmaSenha = '?????';
			let req = {
				method: 'post',
				url: 'http://' + SERVER_URL + ':' + SERVER_PORT + '/rest/rest/integracao/getUsuario/',
				headers: {'Content-Type': 'application/json'},
				data: p
			};


			return $http(req);

		}

		function cadastrar(p) {
			console.log('valor do data:');
			console.log(p);
			let req = {
				method: 'post',
				url: 'http://' + SERVER_URL + ':' + SERVER_PORT + '/rest/rest/integracao/usuario/',
				headers: {'Content-Type': 'application/json'},
				data: p
			};

			if(p.codigo){
				req.method = 'put'
			}

			return $http(req);

		}

	}
})();

(function() {
	'use strict';

	angular.module('app').service('ListaPessoasService', ListaPessoasService);

	ListaPessoasService.$inject = [ '$http'];

	function ListaPessoasService($http) {

		return ({
			listar,
			excluir,
			cadastrar
		});

		function listar() {
			let req = {
				method: 'get',
				url: 'http://' + SERVER_URL + ':' + SERVER_PORT + '/rest/rest/integracao/pessoa',
				headers: {'Content-Type': 'application/json'}
			};
			return $http(req);
		}

		function excluir(p) {

			let req = {
				method: 'delete',
				url: 'http://' + SERVER_URL + ':' + SERVER_PORT + '/rest/rest/integracao/pessoa/' + p.codigo,
				headers: {'Content-Type': 'application/json'}
			};

			return $http(req);

		}

		function cadastrar(p) {

			let req = {
				method: 'post',
				url: 'http://' + SERVER_URL + ':' + SERVER_PORT + '/rest/rest/integracao/pessoa',
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

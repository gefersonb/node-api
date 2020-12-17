(function() {
	'use strict';

	angular.module('app').service('CreditoService', CreditoService);

	CreditoService.$inject = [ '$http'];

	function CreditoService($http) {

		return ({
			listarTodos,
			listarAnalise,
      solicitarAvaliacao
		});

		function listarTodos() {
			let req = {
				method: 'get',
				url: 'http://' + SERVER_URL + ':' + SERVER_PORT + '/rest/rest/credito/listar_todos',
				headers: {'Content-Type': 'application/json'}
			};
			return $http(req);
		}

		function listarAnalise(p) {
			let req = {
				method: 'post',
				url: 'http://' + SERVER_URL + ':' + SERVER_PORT + '/rest/rest/credito/listar',
				headers: {'Content-Type': 'application/json'},
				data: p
			};
			return $http(req);
		}


    function solicitarAvaliacao(p) {

			let req = {
				method: 'post',
				url: 'http://' + SERVER_URL + ':' + SERVER_PORT + '/rest/rest/credito/solicitar_avaliacao',
				headers: {'Content-Type': 'application/json'},
				data: p
			};

			return $http(req);

		}

	}
})();

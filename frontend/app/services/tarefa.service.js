(function() {
	'use strict';

	angular.module('app').service('TarefaService', TarefaService);

	TarefaService.$inject = [ '$http'];

	function TarefaService($http) {

		return ({
			listar
		});

		function listar() {
			let req = {
				method: 'get',
				url: 'http://' + REST_SERVER + ':' + REST_PORT + '/api/tarefas',
				headers: {'Content-Type': 'application/json'}
			};
			return $http(req);
		}

	}
})();

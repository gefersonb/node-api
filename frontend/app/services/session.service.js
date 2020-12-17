(function() {

	'use strict';



	angular.module('app')
			.service('SessionService', SessionService);

			SessionService.$inject = [ '$window', 'jwtHelper' ];

			function SessionService($window, jwtHelper) {

				var getToken = function() {
					var token = $window.sessionStorage.getItem('access_token');
					if (!token) {
						return undefined;
					}
					return token;
				};

				var setToken = function(data) {
					$window.sessionStorage.setItem('access_token', data);
				};

				var removeToken = function() {
					$window.sessionStorage.removeItem('access_token');
				};

				var getUser = function() {
					var token = getToken();
					if (token !== undefined) {
						var tokenPayload = jwtHelper.decodeToken(token);
						return tokenPayload.usuario;
					}
					return undefined;
				};

				return {
					getUser : getUser,
					getToken : getToken,
					setToken : setToken,
					removeToken : removeToken
				};

			}
			
})();

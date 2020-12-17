(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['$state', 'angularAuth0', '$timeout', 'navbarService'];

  function authService($state, angularAuth0, $timeout, navbarService) {

    var accessToken;
    var idToken;
    var expiresAt;



    function getIdToken() {
      return idToken;
    }

    function getAccessToken() {
      return accessToken;
    }

    function login() {
      angularAuth0.authorize();
    }

    function handleAuthentication() {
      angularAuth0.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          localLogin(authResult);
          navbarService.usuario = authResult.idTokenPayload.sub;
          $state.go('home');
        } else if (err) {
          $timeout(function() {
            $state.go('home');
          });

          alert('Error: ' + err.error + '. Check the console for further details.');
        }
      });
    }

    function localLogin(authResult) {
      // Set isLoggedIn flag in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      // Set the time that the access token will expire at
      expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
      accessToken = authResult.accessToken;
      idToken = authResult.idToken;
    }

    function authTecnico() {
      localStorage.setItem('isLoggedIn', 'true');
      expiresAt = (3600 * 1000) + new Date().getTime();
    }

    function renewTokens() {
      angularAuth0.checkSession({},
        function(err, result) {
          if (err) {
            console.log(err);
          } else {
            localLogin(result);
          }
        }
      );
    }

    function logout() {
      // Remove isLoggedIn flag from localStorage
      localStorage.removeItem('isLoggedIn');
      // Remove tokens and expiry time
      accessToken = '';
      idToken = '';
      expiresAt = 0;

      angularAuth0.logout({
        returnTo: window.location.origin
      });

      $state.go('home');
    }

    function isAuthenticated() {
      // Check whether the current time is past the
      // access token's expiry time
      return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiresAt;
      //{g}      return true;
    }

    function loginTecnico() {
      $state.go('login');
    }

    return {
      login: login,
      loginTecnico,
      authTecnico,
      getIdToken: getIdToken,
      getAccessToken: getAccessToken,
      handleAuthentication: handleAuthentication,
      logout: logout,
      isAuthenticated: isAuthenticated,
      renewTokens: renewTokens
    }
  }
})();

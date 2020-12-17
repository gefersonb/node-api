
(function () {
  'use strict';

	angular
	    .module('app').directive('ngConfirmClick', ngConfirmClick);

	  ngConfirmClick.$inject = [];

	  function ngConfirmClick() {

	    var directive = {
	      link: fn_link
	    };
	    return directive;

      function fn_link(scope, element, attr) {
        var msg = attr.ngConfirmClick || "Confirma ?";
        var clickAction = attr.confirmedClick;
        element.bind('click',function (event) {
            if ( window.confirm(msg) ) {
                scope.$eval(clickAction)
            }
        });
      };


	  }
	})();

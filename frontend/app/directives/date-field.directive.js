(function () {

	angular
	    .module('app')
	    .directive('dateField', dateField);

	  dateField.$inject = [];
	  function dateField() {
	    var directive = {
	      require: 'ngModel',
	      link: link,
	      restrict: 'A',
	      scope: {
	        model: '=ngModel'
	      }
	    };
	    return directive;

	    function link(scope, element, attrs, ngModelCtrl) {
	      var display, cpf = "";

        isDigitData = x => {
          return (
            x == '0' ||
            x == '1' ||
            x == '2' ||
            x == '3' ||
            x == '4' ||
            x == '5' ||
            x == '6' ||
            x == '7' ||
            x == '8' ||
            x == '9');

        }

        numbersData = (x) => {
          let res = '';
          for(let i = 0; i < x.length; i++) {
            if(isDigitData(x.charAt(i)))
              res += x.charAt(i);
          }
          return res;
        }

        formatarData = (x) => {
          let display = numbersData(x);
          if(display){
            let ct1 = 0;
            let result = '';
            for(let i = 0; i < display.length; i++) {
              result += display.charAt(i);
              ct1++;
              if(ct1 == 2 && i < 5){
								result += '/';
                ct1 = 0;
              }
            }
            return result;
          }
        }

        scope.$watch('model', function onModelChange(newValue) {
          if(newValue){
            element.val(formatarData(newValue.substring(0,10)));
          }
	      });

				element.on('keypress', function (e) {

					let key = e.which || e.keyCode;
					if(key === 9 || key === 13) {
						return true;
					}
					let char = String.fromCharCode(key);
					if (char.search(/[0-9\-]/) === 0) {
						return true;
					}
					else {
						e.preventDefault();
					}
				});
	    }
	  }
	})();

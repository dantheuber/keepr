'use strict';

module.exports = focusMe;
focusMe.$inject = ['$timeout'];

function focusMe($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

          if (attrs.focusMe !== undefined) {
            scope.$on(attrs.focusMe, focus);
          } else {
            $timeout(focus);
          }

          function focus() {
            element[0].focus();
          }
        }
    };
}

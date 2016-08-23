'use strict';

module.exports = Navigator;

function Navigator() {
  return {
    controller: 'NavigatorController',
    controllerAs: 'nav',
    replace: true,
    restrict: 'E',
    templateUrl: 'navigator/navigator.html'
  };
}

'use strict';

module.exports = Navigator;

function Navigator() {
  return {
    controller: 'NavigatorController',
    controllerAs: 'nav',
    restrict: 'E',
    templateUrl: 'navigator/navigator.html'
  };
}

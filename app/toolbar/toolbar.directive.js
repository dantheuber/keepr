'use strict';

module.exports = Toolbar;
function Toolbar() {
  return {
    controller: 'ToolbarController',
    controllerAs: 'toolbar',
    restrict: 'E',
    templateUrl: 'toolbar/toolbar.html'
  };
}

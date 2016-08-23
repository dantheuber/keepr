'use strict';

module.exports = Editor;

function Editor() {
  return {
    controller: 'EditorController',
    controllerAs: 'editor',
    restrict: 'E',
    replace: true,
    templateUrl: 'editor/editor.html'
  };
}

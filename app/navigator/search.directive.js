'use strict';

module.exports = Search;
Search.$inject = ['hotkeys'];

function Search(hotkeys) {
  return {
    restrict: 'E',
    replace: true,
    link: function (scope, element) {
      hotkeys.bindTo(scope)
        .add({
          combo: 'ctrl+space',
          description: 'Jump to search area',
          callback: function () {
            element.find('input')[0].focus();
          }
        });
    },
    templateUrl: 'navigator/search.html'
  };
}

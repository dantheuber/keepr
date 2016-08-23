'use strict';

var hljs = require('highlight.js');
module.exports = appConfig;
appConfig.$inject = ['$mdThemingProvider', 'markedProvider'];

function appConfig($mdThemingProvider, markedProvider) {
  $mdThemingProvider.theme('default')
    .dark();

  markedProvider.setOptions({
    gfm: true,
    tables: true,
    highlight: function (code, lang) {
      if (lang) return hljs.highlight(lang, code, true).value;
      return hljs.highlight(code).value;
    }
  });
}

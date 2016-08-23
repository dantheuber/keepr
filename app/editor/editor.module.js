'use strict';

module.exports = 'keepr.editor';

angular.module('keepr.editor', [])
  .controller('EditorController', require('./editor.controller'))
  .directive('editor', require('./editor.directive'));

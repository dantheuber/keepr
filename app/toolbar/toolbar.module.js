'use strict';

module.exports = 'keepr.toolbar';

require('angular').module('keepr.toolbar', [])
  .controller('ToolbarController', require('./toolbar.controller'))
  .directive('toolbar', require('./toolbar.directive'));

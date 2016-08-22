'use strict';

module.exports = 'keepr.navigator';

require('angular').module('keepr.navigator', [])
  .controller('NavigatorController', require('./navigator.controller'))
  .directive('navigator', require('./navigator.directive'));

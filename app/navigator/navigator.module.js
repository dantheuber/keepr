'use strict';

module.exports = 'keepr.navigator';

require('angular').module('keepr.navigator', [])
  .controller('NavigatorController', require('./navigator.controller'))
  .directive('searchBar', require('./search.directive'))
  .directive('navigator', require('./navigator.directive'));

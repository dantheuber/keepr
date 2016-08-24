'use strict';

var angular = require('angular');

require('angular-material');
require('angular-moment');
require('angular-marked');

var app = angular
            .module('keepr', [
              // third party modules
              'ngMaterial',
              'angularMoment',
              'hc.marked',
              require('./core/core.module'),
              require('./navigator/navigator.module'),
              require('./editor/editor.module')
            ])
            .config(require('./config'));

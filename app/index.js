'use strict';

var angular = require('angular');

require('angular-material');
require('angular-marked');
require('highlight.js');

var app = angular
            .module('keepr', [
              // third party modules
              'ngMaterial',
              'hc.marked',
              require('./core/core.module')
            ])
            .config(require('./config'));

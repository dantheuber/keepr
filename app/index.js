'use strict';

var angular = require('angular');

var app = angular
            .module('keepr', [
              require('./core/core.module')
            ])
            .config(require('./config'));

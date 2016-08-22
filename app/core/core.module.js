'use strict';

var root = (process.env.APPDATA
         || process.env.HOME
         || process.env.HOMEPATH) + '/.keepr/';

module.exports = 'keepr.core';

require('angular').module('keepr.core', [])
  .constant('rootPath', root)
  .service('notes', require('./notes.service'))
  .controller('AppController', require('./app.controller'));

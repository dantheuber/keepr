'use strict';

module.exports = appConfig;
appConfig.$inject = ['$mdThemingProvider'];

function appConfig($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .dark();
}

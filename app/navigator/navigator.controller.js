'use strict';

module.exports = NavigatorController;
NavigatorController.$inject = ['$scope', 'notes'];

function NavigatorController ($scope, notes) {
  var ctrl = this;
  ctrl.selectedIndex = -1;
  ctrl.loading = true;

  // init empty note array
  ctrl.notes = [];

  $scope.$on('notes-updated', function (e, data) {
    ctrl.loading = false;
    ctrl.notes = data.map(function (d) {
      return {
        _id: d._id,
        title: d.title,
        updated: d.updated
      };
    });
  });

  ctrl.makeActive = notes.makeActive;

  ctrl.removeNote = function removeNote(id) {
    notes.deleteNote(id);
  };
}

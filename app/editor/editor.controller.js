'use strict';

module.exports = EditorController;
EditorController.$inject = ['$scope', 'notes'];

function EditorController($scope, notes) {
  var ctrl = this;

  ctrl.editedNote = {};
  ctrl.originalNote = {};

  ctrl.isEditing = false;
  ctrl.startEditing = function startEditing() {
    ctrl.isEditing = true;
  };

  ctrl.saveChanges = function saveChanges() {
    notes.updateNote(ctrl.editedNote._id, ctrl.editedNote.note)
      .then(function () {
        ctrl.originalNote = ctrl.editedNote;
        ctrl.isEditing = false;
      });
  };

  $scope.$on('selected-note', function (e, data) {
    console.log('selected note', data);
    ctrl.editedNote = data;
    ctrl.originalNote = data;
  });
}

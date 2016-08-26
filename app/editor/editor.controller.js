'use strict';
var copy = require('angular').copy;
module.exports = EditorController;
EditorController.$inject = ['$q', '$scope', '$mdDialog', 'notes'];

function EditorController($q, $scope, $mdDialog, notes) {
  var ctrl = this;

  ctrl.editedNote = {};
  ctrl.originalNote = {};

  ctrl.isEditing = false;
  ctrl.startEditing = function startEditing() {
    ctrl.isEditing = true;
  };

  ctrl.saveChanges = function saveChanges() {
    return notes.updateNote(ctrl.editedNote)
      .then(function () {
        ctrl.originalNote = copy(ctrl.editedNote);
        ctrl.isEditing = false;
      });
  };
  // must get updated title and remove if deleted
  var noteRemoved = false;
  $scope.$on('notes-updated', function (e, data) {
    var ourNote = data.filter(function (note) {
      return note._id === ctrl.editedNote._id;
    })[0] || null;

    if (!ourNote) {
      noteRemoved = true;
      ctrl.originalNote = ctrl.editedNote = {};
      return;
    }
    ctrl.originalNote.title = ctrl.editedNote.title = ourNote.title;
  });

  $scope.$watch(function () { return notes.selectedNote; }, function (nv, ov) {
    if (nv) {
      var deferred = $q.defer();
      if (noteRemoved) {
        noteRemoved = false;
        deferred.resolve();
      }
      else if (ov.note !== ctrl.editedNote.note
           || ov.title !== ctrl.editedNote.title) {
        var confirm = $mdDialog.confirm()
          .title('Save Changes?')
          .textContent('You\'ve made changes to the current note without saving.')
          .ariaLabel('Save Changes?')
          .ok('Save Changes')
          .cancel('Don\'t Save');

        $mdDialog.show(confirm)
                 .then(function () {
                   ctrl.saveChanges().then(deferred.resolve);
                 }, function () {
                   deferred.resolve();
                 });
      }
      else {
        deferred.resolve();
      }
      deferred.promise.then(function() {
        ctrl.originalNote = ctrl.editedNote = copy(nv);
        ctrl.isEditing = false;
      });
    }
  });
}

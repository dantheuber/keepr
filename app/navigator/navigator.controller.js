'use strict';

module.exports = NavigatorController;
NavigatorController.$inject = ['$mdDialog', '$scope', 'notes'];

function NavigatorController ($mdDialog, $scope, notes) {
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
        updated: d.updated,
        menuOpen: false
      };
    });
  });

  // activate note
  ctrl.makeActive = notes.makeActive;

  // remove note
  ctrl.removeNote = function removeNote(id) {
    notes.deleteNote(id);
  };

  // remove all notes
  ctrl.deleteAllNotes = function deleteAllNotes(ev) {
    var confirm = $mdDialog.confirm()
      .title('Delete all notes?')
      .textContent('This action is not reversable.')
      .ariaLabel('Delete all notes')
      .targetEvent(ev)
      .ok('Yes, delete everything.')
      .cancel('NO!');
    $mdDialog.show(confirm).then(notes.deleteAllNotes);
  }

  // create new note
  ctrl.showNewNote = function showNewNote(ev) {
    var confirm = $mdDialog.prompt()
      .title('Create new note')
      .textContent('Please provide a title for your new note.')
      .ariaLabel('Create new note')
      .targetEvent(ev)
      .ok('Okay')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(notes.insertNote);
  };
}

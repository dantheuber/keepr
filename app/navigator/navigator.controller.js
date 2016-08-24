'use strict';

module.exports = NavigatorController;
NavigatorController.$inject = ['$mdDialog', '$scope', 'notes'];

function NavigatorController ($mdDialog, $scope, notes) {
  var ctrl = this;
  ctrl.selectedIndex = -1;
  ctrl.loading = true;
  ctrl.activeId = null;

  // init empty note array
  ctrl.notes = [];

  var selectFirst = true;
  $scope.$on('notes-updated', function (e, data) {
    ctrl.loading = false;
    ctrl.notes = data.map(function (note) {
      note.menuOpen = false;
      return note;
    });
    if (selectFirst) {
      ctrl.makeActive(ctrl.notes[0]._id);
      selectFirst = false;
    }
  });

  // activate note
  ctrl.makeActive = function (id) {
    ctrl.activeId = id;
    notes.makeActive(id);
  };

  // rename note title
  ctrl.renameNote = function renameNote(ev, note) {
    var confirm = $mdDialog.prompt()
      .title('Enter new title for')
      .textContent('"'+note.title+'"')
      .ariaLabel('Rename Note')
      .targetEvent(ev)
      .ok('Rename')
      .cancel('Keep Current Name');
    $mdDialog.show(confirm).then(function (title) {
      note.title = title;
      notes.updateNote(note);
    });
  };

  // remove note
  ctrl.removeNote = function removeNote(ev, id) {
    var confirm = $mdDialog.confirm()
      .title('Delete Note?')
      .textContent('Are you sure you would like to delete this note?')
      .ariaLabel('Delete Note')
      .targetEvent(ev)
      .ok('Delete')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      notes.deleteNote(id);
    });
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
  };

  // create new note
  ctrl.showNewNote = function showNewNote(ev) {
    var confirm = $mdDialog.prompt()
      .title('Create new note')
      .textContent('Please provide a title for your new note.')
      .ariaLabel('Create new note')
      .targetEvent(ev)
      .ok('Okay')
      .cancel('Cancel');
    selectFirst = true;
    $mdDialog.show(confirm).then(notes.insertNote);
  };
}

'use strict';

module.exports = ToolbarController;
ToolbarController.$inject = ['$mdDialog', 'notes'];

function ToolbarController($mdDialog, notes) {
  var ctrl = this;
  ctrl.isOpen = false;

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
}

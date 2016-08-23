'use strict';

module.exports = ToolbarController;
ToolbarController.$inject = ['$mdDialog', 'notes'];

function ToolbarController($mdDialog, notes) {
  var ctrl = this;
  ctrl.isOpen = false;

  ctrl.showNewNote = function showNewNote(ev) {
    var confirm = $mdDialog.prompt()
      .title('New Note Title')
      .textContent('Please provide a title for your new note.')
      .ariaLabel('Note Title')
      .targetEvent(ev)
      .ok('Okay')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(notes.insertNote);
  };

}

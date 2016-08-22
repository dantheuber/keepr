'use strict';

module.exports = NavigatorController;
NavigatorController.$inject = ['$mdDialog', '$scope', 'notes'];

function NavigatorController($mdDialog, $scope, notes) {
  var ctrl = this;
  ctrl.loading = true;
  ctrl.noteService = notes;
  notes.load
    .then(function() {
      ctrl.loading = false;
    })
    .catch(function (err) {
      console.log('Error loading notes:', err);
    });


  ctrl.showNewNote = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('New Note Title')
      .textContent('Please provide a title for your new note.')
      .placeholder('Note Title')
      .ariaLabel('Note Title')
      .targetEvent(ev)
      .ok('Okay')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(notes.insertNote);
  };
}

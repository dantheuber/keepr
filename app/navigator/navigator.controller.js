'use strict';

module.exports = NavigatorController;
NavigatorController.$inject = ['$mdDialog', '$rootScope', '$scope', 'hotkeys', 'notes'];

function NavigatorController ($mdDialog, $rootScope, $scope, hotkeys, notes) {
  var ctrl = this;
  ctrl.loading = true;
  ctrl.activeId = null;
  ctrl.searchText = '';

  $scope.$watch(function () {
    return ctrl.searchText;
  }, function (nv) {
    if (nv !== '') {
      ctrl.notes = notes.notes.filter(function (note) {
        return note.title.toLowerCase().indexOf(nv.toLowerCase()) !== -1;
      }).map(mapNotes);
    } else {
      ctrl.notes = notes.notes.map(mapNotes);
    }
  });

  // init empty note array
  ctrl.notes = [];

  var selectFirst = true;
  $scope.$on('notes-updated', function (e, data) {
    ctrl.loading = false;
    ctrl.notes = data.map(mapNotes);
    if (selectFirst) {
      ctrl.makeActive(ctrl.notes[0]._id);
      selectFirst = false;
    }
  });

  function mapNotes(note) {
    return {
      _id: note._id,
      title: note.title,
      menuOpen: false,
      updated: note.updated
    };
  }

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

  // register hotkeys
  hotkeys.bindTo($scope)
    .add({
      combo: 'ctrl+n',
      description: 'Create a new note',
      allowIn: ['INPUT', 'TEXTAREA'],
      callback: ctrl.showNewNote
    })
    .add({
      combo: 'ctrl+up',
      description: 'Select previous note',
      allowIn: ['INPUT'],
      callback: selectPrevious
    })
    .add({
      combo: 'ctrl+down',
      description: 'Select next note',
      allowIn: ['INPUT'],
      callback: selectNext
    });

  function selectPrevious() {
    var selectIndex;
    for (var i = 0; i <= ctrl.notes.length - 1; i++) {
      var temp = ctrl.notes[i];
      if (ctrl.activeId === temp._id) {
        selectIndex = i - 1;
        if (i === 0) {
          selectIndex = ctrl.notes.length - 1;
        }
        break;
      }
    }
    var toActiveId = ctrl.notes[selectIndex]._id;
    ctrl.makeActive(toActiveId);
  }

  function selectNext() {
    var selectIndex;
    for (var i = 0; i <= ctrl.notes.length - 1; i++) {
      var temp = ctrl.notes[i];
      if (ctrl.activeId === temp._id) {
        selectIndex = i + 1;
        if (i === ctrl.notes.length - 1) {
          selectIndex = 0;
        }
        break;
      }
    }
    var toActiveId = ctrl.notes[selectIndex]._id;
    ctrl.makeActive(toActiveId);
  }
}

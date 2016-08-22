'use strict';

var Datastore = require('nedb');

module.exports = noteService;
noteService.$inject = ['$q', 'rootPath'];

function noteService($q, rootPath) {
  var svc = this;
  // initialize note datastore
  var db = new Datastore(rootPath + 'notes_db');
  db.loadDatabase();

  svc.notes = [];
  // retrieve notes
  var deferredNotes = $q.defer();
  db.find({}, function (err, notes) {
    if (err) return deferredNotes.reject(err);
    svc.notes = notes;
    deferredNotes.resolve();
    console.log('retrieved notes:', notes);
  });
  svc.load = deferredNotes.promise;

  // insert a new note
  svc.insertNote = function insertNote(title, note) {
    if (note === undefined) note = '';
    var deferred = $q.defer();
    var newNoteDoc = {
      title: title,
      note: note
    };
    db.insert(newNoteDoc, resdef(deferred));
    deferred.promise.then(svc.notes.unshift);
    return deferred.promise;
  };

  // delete a note
  svc.deleteNote = function deleteNote(id) {

  };
}

// resolve deferred function - for putting in place of callbacks
function resdef (deferred) {
  return function (err, data) {
    if (err) return deferred.reject(err);
    deferred.resolve(data);
  };
}

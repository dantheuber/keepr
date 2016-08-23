'use strict';

var _ = require('lodash');
var Datastore = require('nedb');

module.exports = noteService;
noteService.$inject = ['$rootScope', '$q', 'rootPath'];

function noteService($rootScope, $q, rootPath) {
  var svc = this;
  // the currently selected note
  svc.selectedNote = {};
  // initialize note datastore
  var db = new Datastore(rootPath + 'notes_db');
  db.loadDatabase();

  svc.notes = [];
  // retrieve notes
  db.find({}, function (err, notes) {
    if (err) return deferredNotes.reject(err);
    svc.notes = notes;
    broadcastUpdate();
    $rootScope.$apply();
  });

  svc.makeActive = function makeActive(id) {
    var note = svc.notes.filter(function (n) { return n._id === id; })[0];
    svc.selectedNote = note;
    $rootScope.$broadcast('selected-note', note);
  };

  // insert a new note
  svc.insertNote = function insertNote(title, note) {
    if (title === undefined) title = '';
    if (note === undefined) note = '';
    var deferred = $q.defer();
    var newNoteDoc = {
      title: title,
      note: note,
      updated: new Date()
    };
    db.insert(newNoteDoc, resdef(deferred));
    deferred.promise.then(function (newNote) {
      svc.notes.unshift(newNote);
      svc.makeActive(newNote._id);
      broadcastUpdate();
    });
    return deferred.promise;
  };

  // update an existing notes contents
  svc.updateNote = function (notes) {
    var deferred = $q.defer();
    var updated = new Date();
    var projection = {
      $set: {
        note: notes.note,
        title: notes.title,
        updated: updated
      }
    };
    db.update({ _id: notes._id}, projection, {}, resdef(deferred));
    _.each(svc.notes, function (note) {
      if (note._id === notes._id) {
        note.note = notes.note;
        note.title = notes.title;
        note.updated = updated;
      }
    });
    deferred.promise.then(broadcastUpdate);
    return deferred.promise;
  };

  // delete a note
  svc.deleteNote = function deleteNote(id) {
    var deferred = $q.defer();
    db.remove({ _id: id }, resdef(deferred));
    svc.notes = svc.notes.filter(function (note) { return note._id !== id; });
    broadcastUpdate();
    return deferred.promise;
  };
  // delete ALL notes
  svc.deleteAllNotes = function deleteAllNotes() {
    var deferred = $q.defer();
    db.remove({}, { multi: true }, resdef(deferred));
    svc.notes = [];
    broadcastUpdate();
    return deferred.promise;
  };

  function broadcastUpdate() {
    $rootScope.$broadcast('notes-updated', svc.notes);
  }
}

// resolve deferred function - for putting in place of callbacks
function resdef (deferred) {
  return function (err, data) {
    if (err) return deferred.reject(err);
    deferred.resolve(data);
  };
}

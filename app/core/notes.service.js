'use strict';

var Datastore = require('nedb');

module.exports = noteService;
noteService.$inject = ['$q', 'rootPath'];

function noteService($q, rootPath) {
  var svc = this;
  // initialize note datastore
  var db = new Datastore(rootPath + 'notes_db');
  db.loadDatabase();

  // get categories 
  svc.noteCategories = [];

  // retrieve notes
  svc.getNotes = function getNotes() {
    var deferred = $q.defer();
    db.find({}, resdef(deferred));
    deferred.promise.catch(function (error) {
      // good to do something with errors in service?
    });
    return deferred.promise;
  };

  // insert a new note
  svc.insertNote = function insertNote(title, note) {
    var deferred = $q.defer();
    var newNoteDoc = {
      title: title,
      note: note
    };
    db.insert(newNoteDoc, resdef(deferred));
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

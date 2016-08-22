'use strict';

var electron = require('electron');
var app = electron.app;
// enable debug features
require('electron-debug')();

// create main window
var mainWindow = null;
function onClosed() {
  mainWindow = null;
}
function createMainWindow() {
  var win = new electron.BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    'min-width': 500
  });

  win.loadURL('file://' + __dirname + '/index.html');
  win.on('closed', onClosed);
  return win;
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', function () {
  mainWindow = createMainWindow();
});

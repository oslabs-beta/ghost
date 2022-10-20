const { app, BrowserWindow } = require('electron');

function createWindow() {
  // Create the browser window
  let win = new BrowserWindow({
    width: 1024,
    height: 576,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // and load the index.html of the app
  win.loadFile('index.html');
}

app.on('ready', createWindow);
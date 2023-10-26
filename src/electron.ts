import { app, BrowserWindow } from 'electron';

async function createWindow(): Promise<void> {
  // Create the browser window
  const win = new BrowserWindow({
    width: 1400,
    height: 850,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app
  await win.loadFile('index.html');
}

app.on('ready', () => {
  createWindow().catch((error) => {
    console.error('Failed to create window:', error);
  });
});

const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const menuBar = require('./menu');
const { loadMainResource } = require('./utils');
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1080,
    minHeight: 720,
    show: false,
  });
  mainWindow.maximize();
  mainWindow.show();

  loadMainResource(mainWindow);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

const menu = Menu.buildFromTemplate(menuBar);
Menu.setApplicationMenu(menu);

app.on('ready', () => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('get-product-name', (event) => {
  const exePath = app.getPath('exe');
  const { name } = path.parse(exePath);
  return name;
});

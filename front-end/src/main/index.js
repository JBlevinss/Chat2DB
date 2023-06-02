const { app, BrowserWindow } = require('electron');
const path = require('path');
const electronReload = require('electron-reload');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1080,
    minHeight: 720,
    show: false,
  });
  mainWindow.maximize();
  mainWindow.show();

  if (process.env.NODE_ENV === 'development') {
    // 开发环境
    // 加载页面并打开调试工具,根据 NODE_ENV
    // umijs 在dev时会给出相应的url，直接加载即可
    mainWindow.loadURL('http://localhost:8000/');
    mainWindow.webContents.openDevTools();

    // 监听应用程序根路径下的所有文件，当文件发生修改时，自动刷新应用程序
    electronReload(path.join(__dirname, '..'));

  } else {
    //生产环境
    // 加载html文件
    // 这里的路径是umi输出的html路径，如果没有修改过，路径和下面是一样的
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, './dist/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

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

import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: BrowserWindow | null = null;
function createWindow() {
  //创建窗口
  mainWindow = new BrowserWindow({
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      nodeIntegration: true,
    },
    backgroundColor: '#2e2c29',
    darkTheme: true,
    title: 'My App',
    width: 1700,
    frame: true,
    minWidth: 1300,
    minHeight: 900,
  });
  if (process.env.NODE_ENV === 'development') {
    // 开发环境
    // 加载页面并打开调试工具,根据 NODE_ENV
    // umijs 在dev时会给出相应的url，直接加载即可
    mainWindow.loadURL('http://localhost:8000/');
    mainWindow.webContents.openDevTools();
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
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

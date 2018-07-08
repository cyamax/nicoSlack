// Modules to control application life and create native browser window
"use strict"
const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let invisibleWindow, mainWindow;

function createWindow() {
  // Create the browser window.

  // 画面いっぱいに表示
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  invisibleWindow = new BrowserWindow({
    width,
    height,
    frame: false, //　ウィンドウフレーム非表示
    transparent: true,  //背景を透明に
    alwaysOnTop: true,  //常に最前面

  });

  mainWindow = new BrowserWindow({
    width: 320,
    height: 240,
  });


  // 透明な部分のマウスのクリックを検知させない
  invisibleWindow.setIgnoreMouseEvents(true);

  // and load the index.html of the app.
  invisibleWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  invisibleWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    invisibleWindow = null;
    mainWindow = null;
  });

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    invisibleWindow = null;
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (invisibleWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



function sendToRendererContent(slackText) {
  // mainWindow.webContents.on('did-finish-load', () => {
  // レンダラー側のonが実行される前に送るとエラーで落ちるので注意
  invisibleWindow.webContents.send('slackContent', slackText)
  // });
};



// Slack Outgoing Web Hook
const { RTMClient } = require('@slack/client');
const token = require('./account.json').token;

const rtm = new RTMClient(token, { logLevel: 'debug' });

rtm.start();

rtm.on('message', (event) => {
  // For structure of `event`, see https://api.slack.com/events/message

  let message = event;
  // Skip messages that are from a bot or my own user ID
  // if ((message.subtype && message.subtype === 'bot_message') ||
  //     (!message.subtype && message.user === rtm.activeUserId)) {
  //     return;
  // }

  // Log the message
  console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
  sendToRendererContent(`${message.text}`);
});


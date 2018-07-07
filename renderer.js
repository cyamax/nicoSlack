// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
NicoJS = require('nicoJS');
const { ipcRenderer } = require('electron');

var nico = new NicoJS({
    app: document.getElementById('app'),
    width: 1200,
    height: 400,
    font_size: 50,     // opt
    color: '#fff'  // opt
});


// コメント待機
nico.listen();

// コメント送信
// nico.loop(['Hello World.']);

ipcRenderer.on('slackContent', (event, arg) => {
    console.log(arg) // "pong"を表示

    nico.send(arg);
});
// ipcRenderer.send('asynchronous-message', 'ping');

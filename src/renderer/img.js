const { ipcRenderer } = require('electron')

ipcRenderer.on('data', (e, data) => {
    alert(JSON.stringify(data))
})
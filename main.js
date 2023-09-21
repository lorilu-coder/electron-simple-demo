// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const { app, BrowserWindow,ipcMain } = require('electron')
const path = require('path')
const electron = require("electron");

let mainWindow
const createWindow = () => {
    // 创建浏览窗口
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 加载 index.html
    mainWindow.loadFile('index.html')

    // 打开开发工具
    // mainWindow.webContents.openDevTools()
}

// 第二窗口，如果有外接显示屏，显示在外接显示屏上，否则显示在当前显示屏上
const createImageWindow = (data) => {
    let displays = electron.screen.getAllDisplays()
    let externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0
    })
    let oWindow = null;
    if (externalDisplay) {
        oWindow = new BrowserWindow({
            fullscreen: false,
            title: data.picno,
            width: 1150,
            height: 650,
            parent: mainWindow,
            x: externalDisplay.bounds.x,
            y: externalDisplay.bounds.y,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        })
    } else {
        oWindow = new BrowserWindow({
            fullscreen: false,
            title: data.picno,
            width: 1150,
            height: 650,
            parent: mainWindow,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                // preload: path.join(__dirname,'preload.js')
            }
        })
    }

    oWindow.loadFile('./src/renderer/img.html')
    oWindow.webContents.on('did-finish-load', () => {
        oWindow.webContents.send('data', data)
    })
    // oWindow.webContents.openDevTools()

}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    ipcMain.on('openWindow',(event,data)=>{
        createImageWindow(data)
    })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
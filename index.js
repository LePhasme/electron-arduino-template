// Common electron stuff…
const electron = require('electron')
const app = electron.app
const ipcMain = electron.ipcMain
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const fs = require('fs')
const spawn = require('child_process').spawn
const nodeJsPath = '/usr/local/bin/node' // Set it to the path of the node.js executable
const debug = true // Set it to true in order to open the Dev Tools

let mainWindow
let serialBackend

function createWindow() {

    // Create the window
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        fullscreen: true,
        webPreferences: {
            'nodeIntegration': true,
            'web-security': false,
            'plugins': true
        }
    })

    // Load the main page:
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'frontend', 'main.html'),
        protocol: 'file:',
        slashes: true
    }))

    if (debug === true) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // Launch the backend (interface with Arduino):
    serialBackend = spawn(nodeJsPath, [path.join(__dirname, 'backend', 'serial-backend')], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    })

    serialBackend.on('error', (err) => {
        if (mainWindow) {
            mainWindow.webContents.send('serial-error', err)
        }
    })

    serialBackend.on('close', (err) => {
        // @TODO close handling
    })

    serialBackend.on('exit', (err) => {
        // @TODO exit handling
    })

    // Here we transmit the messages from the backend to the frontend:
    serialBackend.on('message', (data) => {
        if (mainWindow) {
            if (data.error !== undefined) {
                mainWindow.webContents.send('serial-error', data)
            } else if (data.ready !== undefined) {
                mainWindow.webContents.send('serial-ready', data)
            } else {
                mainWindow.webContents.send('serial-data', data)
            }
        }
    })

    // Here we transmit the messages from the frontend to the backend:
    ipcMain.on('serial-data', (event, arg) => {
        serialBackend.send(arg)
    })
}

// Common electron stuff…
app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

// To communicate with the main process:
const { ipcRenderer } = require('electron')

// When the Arduino is ready:
ipcRenderer.on('serial-ready', () => {
    console.log('ready')
    // Could be useful…
})

// When the Arduino doesn't feel well:
ipcRenderer.on('serial-error', (event, data) => {
    console.log('error', data)
    // Could be useful too…
})

// When we get some data from the Arduino:
ipcRenderer.on('serial-data', (event, data) => {
    console.log('data', data)
    // data contains the incoming data as an object or as a string...
})

// Convenient function to send some data to the Arduino (through the Electron main process):
function sendDataToArduino(data) {
    ipcRenderer.send('serial-data', data)
}

$(document).ready(() => {

    // Do things once the page is ready...

})

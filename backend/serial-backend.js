// Main Settings
const arduinoPort = '/dev/cu.usbmodem1411' // Serial port for the Arduino board (as reported by the Arduino IDE)
const arduinoBaudRate = 115200 // Baud rate (has to be the same as the one defined in the Arduino sketch!)

// Create the Arduino interface
const SerialPort = require('serialport')

let input = new SerialPort(arduinoPort, {
    baudRate: arduinoBaudRate,
    autoOpen: false,
    parser: SerialPort.parsers.readline('\n') // Here we assume that the Arduino sends data separated by a line feed
})

// The script can be run from the terminal for debug purpose
// In that case there is no process.send() method (it is only available within spawned processes)
// So we simply provide it as a clone of console.log()
if (typeof process.send !== 'function') {
    process.send = console.log
} else {
    // This makes sense only within a spawned process:
    process.on('message', (data) => {
        // Here we get some data from the Frontend, which we could send to the Arduino
        // (see https://github.com/EmergingTechnologyAdvisors/node-serialport#module_serialport--SerialPort+write)
    })
}

// When the Arduino interface is ready
input.on('open', () => {
    process.send({
        ready: true
    })
})

// When the shit hits the fan
input.on('error', (err) => {
    process.send({
        error: err
    })
})

// When we get some data from the Arduino...
input.on('data', (data) => {
    // ...we transmit them to the Electron main process, which will transmit them to the Frontend window
    try {
        let objData = JSON.parse(data) // We even assume that the Arduino can send JSON strings (see example sketch)
        process.send(objData)
    } catch (ignore) {
        process.send(data)
    }
})

// Let's open the Arduino interface:
input.open((err) => {
    if (err) {
        process.send({
            error: err
        })
    }
})

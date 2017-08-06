1. Download or clone the repository then perform `npm install` from within the `electron-arduino-template` folder
2. Change the `nodeJsPath` variable of the `index.js` script so it reflects the actual path of your node.js installation
3. Upload the `test.ino` sketch into the Arduino, note the port identifier given by the Arduino IDE and replace the `arduinoPort` with it in the `backend/serial-backend.js` script. Quit the Arduino IDE.
4. Open Electron then drag'n drop the `electron-arduino-template` into its window (in the "Drag your app here to run it" area)

Files:

* `index.js`: the main Electron script that opens the window with the Frontend (visible part), launches the Backend (Arduino part) and acts as a gateway between the Frontend and the Backend – **Be sure to check the `nodeJsPath` and `debug` variables there!**
* `backend/serial-backend.js`: pure node.js script (Backend) that handles the connection with the Arduino and transmits its data to the Electron main script – **Be sure to check the `arduinoPort` and `arduinoBaudRate` variables there!**
* `frontend/js/main.js`: main script for the Frontend, which receives the data from the Arduino (and can send some data back) – it works as a regular JS script within a browser (as it is loaded by the `frontend/main.html` file inside the window), but it also has access to some node.js features (`require()`, file system, etc.)
* `test.ino`: a simple Arduino sketch to test all this...

Tips:

* If you want to "package" your application as a "standalone" one, simply rename the main folder (here `electron-arduino-template`) to `app`, then move it into the `Resources` folder of Electron.

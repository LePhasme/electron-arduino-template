1. Download or clone the repository then perform `npm install` from within the `electron-arduino-template` folder
2. Open Electron then drag'n drop the `electron-arduino-template` into its window (in the "Drag your app here to run it" area)

Files:

* `index.js`: the main Electron script that opens the window with the Frontend (visible part), launches the Backend (Arduino part) and acts as a gateway between the Frontend and the Backend
* `backend/serial-backend.js`: pure node.js script (Backend) that handles the connection with the Arduino and transmits its data to the Electron main script
* `frontend/js/main.js`: main script for the Frontend, which receives the data from the Arduino (and can send some data back) – it works as a regular JS script within a browser (as it is loaded by the `frontend/main.html` file inside the window), but it also has access to some node.js features (`require()`, file system, etc.)

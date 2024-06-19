const { app, BrowserWindow, ipcMain, screen} = require('electron');
const path = require('path');
const net = require('net');

app.disableHardwareAcceleration();


const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  const win = new BrowserWindow({
    transparent: true,
    frame: false,
    fullscreen: false,
    width: 755,
    height: 315,
    x: (width - 755),
    y: (height - 315),

    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // win.webContents.openDevTools(),
  
  win.loadFile('index.html');
  win.show();
};

app.whenReady().then(() => {
  console.log('App is ready');

  const win = createWindow();

  app.on('activate', () => {
    console.log('App activate event');
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Set up the TCP server to receive events from the secondary program
  const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
      try {
        console.log('Received data from client:', data.toString());
        const event = JSON.parse(data);
        BrowserWindow.getAllWindows().forEach(win => {
          console.log('Sending event to renderer process:', event);
          win.webContents.send('external-event', event);
        });
      } catch (error) {
        console.error('Error parsing data from client:', error);
      }
    });

    socket.on('end', () => {
      console.log('Client disconnected');
    });

    socket.on('error', (err) => {
      console.error('Socket error:', err);
    });
  });

  server.listen(5500, '0.0.0.0', () => {
    console.log('Server listening on port 5500');
  });

  server.on('error', (err) => {
    console.error('Server error:', err);
  });
});

app.on('window-all-closed', () => {
  console.log('All windows closed');
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
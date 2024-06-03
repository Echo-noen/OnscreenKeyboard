const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onExternalEvent: (callback) => {
    console.log('Setting up external event listener');
    ipcRenderer.on('external-event', callback);
  }
});
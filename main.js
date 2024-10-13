const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

app.disableHardwareAcceleration();
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-software-rasterizer");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");

  // Open DevTools (optional)
//   mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  // Handle URL search
  ipcMain.on("search-url", (event, url) => {
    mainWindow.loadURL(url);
  });

  // Handle Back button
  ipcMain.on("navigate-back", () => {
    if (mainWindow.webContents.canGoBack()) {
      mainWindow.webContents.goBack();
    }
  });

  // Handle Forward button
  ipcMain.on("navigate-forward", () => {
    if (mainWindow.webContents.canGoForward()) {
      mainWindow.webContents.goForward();
    }
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

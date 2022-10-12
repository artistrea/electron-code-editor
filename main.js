const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')

require('electron-reloader')(module)

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: "hiddenInset",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

ipcMain.on('saveText', (e, {fileName, value}) => {
    fs.writeFileSync(path.join(__dirname, fileName), value)
})

ipcMain.handle('getInitialText', (e, fileName) => {
    try {
        const initialContent = fs.readFileSync(path.join(__dirname, fileName))
    
        return initialContent.toString()
    } catch {
        return ''
    }
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

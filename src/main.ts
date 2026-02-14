import { app, BrowserWindow } from "electron"
import path from "path"

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), "build/src/preload/preload.js"),
            sandbox: false,
            nodeIntegration: false,
            contextIsolation: true
        }
    })

    
    win.menuBarVisible = true

    win.loadFile('build/src/index/index.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on("window-all-closed", () => {
    app.quit()
})
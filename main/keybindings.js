const { globalShortcut } = require('electron');

//TODO not as class. Use global BrowserWindow
class Keybindings {
    constructor(browserWindow) {
        this.browserWindow = browserWindow;
        globalShortcut.register('medianexttrack', () => {
            console.log('main > keybindings > medianexttrack');
            this.browserWindow.webContents.send('next');
        });
        globalShortcut.register('mediaplaypause', () => {
            console.log('main > keybindings > mediaplaypause');
            this.browserWindow.webContents.send('playpause');
        });
        globalShortcut.register('mediaprevioustrack', () => {
            console.log('main > keybindings > mediaprevioustrack');
            this.browserWindow.webContents.send('previous');
        });
        globalShortcut.register('mediastop', () => {
            console.log('main > keybindings > mediastop');
            this.browserWindow.webContents.send('stop');
        });
    }
}

module.exports = Keybindings;

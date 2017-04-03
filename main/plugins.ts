"use strict";
import App = Electron.App;
const path = require('path');

module.exports = {
  init(app){
    console.log('Plugins.init');
    let ppapi_flash_path;

    if(process.platform  == 'win32'){
      ppapi_flash_path = path.join(__dirname, './plugins/pepflashplayer.dll');
    }
    else if (process.platform == 'linux') {
      ppapi_flash_path = path.join(__dirname, './plugins/libpepflashplayer.so');
    }
    else if (process.platform == 'darwin') {
      ppapi_flash_path = path.join(__dirname, './plugins/PepperFlashPlayer.plugin');
    }

    app.commandLine.appendSwitch('ppapi-flash-path', ppapi_flash_path);
    app.commandLine.appendSwitch('ppapi-flash-version', '18.0.0.203');
  }
};

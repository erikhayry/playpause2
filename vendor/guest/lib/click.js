const {ipcRenderer} = require('electron');

ipcRenderer.on('playpause', function(event, args){
    console.log('playpause', event, args)
    let playBtnEl = document.querySelectorAll(args)[0];
    if(playBtnEl){
        playBtnEl.click()
        console.log('playpaused')
        ipcRenderer.sendToHost('playpaused');
    }
    else{
        console.log('playpaused failed')
        ipcRenderer.sendToHost('playpausedfailed');
    }
});

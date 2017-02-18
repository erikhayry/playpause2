const {ipcRenderer} = require('electron');

ipcRenderer.on('playpause', function(){
    let playBtnEl = document.getElementsByClassName('player-play')[0];
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

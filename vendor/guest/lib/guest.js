const {ipcRenderer} = require('electron');
const guestDomService = require('./guest-dom-service');

ipcRenderer.on('playpause', function(event, idName, className){
    console.log('playpause', event, idName, className);
    let success = guestDomService.playPauseAction(idName, className);

    if(success){
        ipcRenderer.sendToHost('playpaused');
    }
    else{
        ipcRenderer.sendToHost('playpausedfailed');
    }
});

ipcRenderer.on('findCandidates', function(event, url){
    console.log('findCandidates', event, url);
    ipcRenderer.sendToHost('candidatesFound', guestDomService.getCandidates(url));
});

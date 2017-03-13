const {ipcRenderer} = require('electron');


function getCandidates(){
    let elements = document.querySelectorAll('audio');
    let candidates = [];

    [].forEach.call(elements, (el) => {
        candidates.push({
            type: el.tagName,
            id: el.id,
            className: el.className
        })
    });

    return candidates;
}



ipcRenderer.on('playpause', function(event, args){
    console.log('playpause', event, args)
    let playPauseEl = document.querySelectorAll(args)[0];
    if(playPauseEl){
        if(playPauseEl.tagName === 'AUDIO'){
            console.log('Audio', playPauseEl)
            if(!playPauseEl.paused){
                playPauseEl.pause()
            }
            else{
                playPauseEl.play()
            }
        }
        else{
            playPauseEl.click()
        }
        console.log('playpaused')
        ipcRenderer.sendToHost('playpaused');
    }
    else{
        console.log('playpaused failed')
        ipcRenderer.sendToHost('playpausedfailed');
    }
});

ipcRenderer.on('findCandidates', function(event, args){
    console.log('findCandidates', event, args)
    ipcRenderer.sendToHost('candidatesFound', getCandidates());
});

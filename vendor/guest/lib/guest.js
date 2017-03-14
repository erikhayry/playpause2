const {ipcRenderer} = require('electron');


function getCandidates(url){
    let elements = document.querySelectorAll('audio');
    let candidates = [];

    [].forEach.call(elements, (el) => {
        candidates.push({
            name: document.title,
            url: url,
            type: el.tagName,
            id: el.id,
            className: el.className
        })
    });

    return candidates;
}



ipcRenderer.on('playpause', function(event, selector){
    console.log('playpause', event, selector)
    let playPauseEl = document.querySelectorAll(selector)[0];
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

ipcRenderer.on('findCandidates', function(event, url){
    console.log('findCandidates', event, url)
    ipcRenderer.sendToHost('candidatesFound', getCandidates(url));
});

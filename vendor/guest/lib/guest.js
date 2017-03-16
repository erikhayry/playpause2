const {ipcRenderer} = require('electron');


function getCandidates(url){
    let elements = document.querySelectorAll('*');
    let candidates = [];

    [].forEach.call(elements, (el) => {
        let type = el.tagName;
        if(type == 'AUDIO' || type == 'BUTTON'){
            candidates.push({
                name: document.title,
                url: url,
                type: el.tagName,
                id: el.id,
                className: el.className
            })
        }
    });

    return candidates;
}

ipcRenderer.on('playpause', function(event, idName, className){
    console.log('playpause', event, idName, className)

    let selector = '';
    let playPauseEl;

    if(idName || className){
        selector = idName ? '#' + idName : '.' + className.split(' ').join('.');
        console.log('selector', selector)
        playPauseEl = document.querySelectorAll(selector)[0];
    }

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
        else if(playPauseEl.tagName === 'BUTTON'){
            console.log('Button', playPauseEl)
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

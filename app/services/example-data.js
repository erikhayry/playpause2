import Ember from 'ember';

export default Ember.Service.extend({
    store: Ember.inject.service(),
    load(){
        let store = this.get('store');

        //TODO use pushPayload
        //TODO store as files
        [
            {
                name: 'SR.se',
                url: 'http://sr.se',
                playPauseAction: 'document.getElementsByClassName("player-play")[0].click()',
                stopAction: null,
                nextAction: null,
                previousAction: null
            },
            {
                name: 'Spotify',
                url: 'https://play.spotify.com/',
                playPauseAction:
`var playPauseBtn = window.frames['app-player'].contentDocument.querySelectorAll('#play-pause')[0];
if(playPauseBtn){
    playPauseBtn.click();
}`,
                stopAction: null,
                nextAction:
`var nextBtn = window.frames['app-player'].contentDocument.querySelectorAll('#next')[0];
if(nextBtn){
  nextBtn.click();
}`,
                previousAction:
`var previousBtn = window.frames['app-player'].contentDocument.querySelectorAll('#previous')[0];
if(previousBtn){
  previousBtn.click();
}`
            },
            {
                name: 'BBC',
                url: 'http://www.bbc.co.uk/radio/player/bbc_6music',
                playPauseAction:
`var playBtn = document.getElementById("btn-play");
var stopBtn = document.getElementById("btn-stop");
var playBtnStyle = window.getComputedStyle(playBtn, null);

if(playBtnStyle.display === 'none'){
    stopBtn.click()
}
else{
    playBtn.click()
}`,
                stopAction: null,
                nextAction: null,
                previousAction: null
            },
            {
                name: 'Soundcloud',
                url: 'https://soundcloud.com',
                playPauseAction:
`var btn = document.getElementsByClassName('playControls__play')[0];
if(btn){
    btn.click()
}`,
                stopAction: null,
                nextAction:
`var btn = document.getElementsByClassName('playControls__next')[0];
if(btn){
    btn.click()
}`,
                previousAction:
`var btn = document.getElementsByClassName('playControls__prev')[0];
if(btn){
    btn.click()
}`,
            }
        ].forEach(station => {
            let sr = store.createRecord('station', station);
            sr.save();
        });
    }
});

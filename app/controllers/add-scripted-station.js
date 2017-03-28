import Ember from 'ember';

export default Ember.Controller.extend({
    isLoading: true,
    componentProperty: false,
    actions: {
        didNavigate: function(url){
            console.log('didNavigate', url)
            this.set('isLoading', false)
        },
        saveCandidate: function(name, url, playPauseActionScript, stopActionScript, nextActionScript, previousActionScript) {
            let store = this.get('store');

            console.log('saveCandidate', name, url, playPauseActionScript, stopActionScript, nextActionScript, previousActionScript);
            let station = this.store.createRecord('station', {
                name: name,
                url: url,
                playPauseAction: playPauseActionScript,
                stopAction: stopActionScript,
                nextAction: nextActionScript,
                previousAction: previousActionScript
            });
            station.save();
            this.transitionToRoute('stations');
        }
    }
});

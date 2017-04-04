import Ember from 'ember';

export default Ember.Controller.extend({
    isLoading: true,
    componentProperty: false,
    actions: {
        didNavigate(url){
            console.log('didNavigate', url);
            this.set('isLoading', false);
        },
        saveCandidate(name, url, playPauseAction, stopAction, nextAction, previousAction) {
            console.log('saveCandidate', name, url, playPauseAction, stopAction, nextAction, previousAction);
            let station = this.store.createRecord('station', {
                name: name,
                url: url,
                playPauseAction: playPauseAction,
                stopAction: stopAction,
                nextAction: nextAction,
                previousAction: previousAction
            });
            station.save();
            this.transitionToRoute('stations');
        }
    }
});

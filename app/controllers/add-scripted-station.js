import Ember from 'ember';

export default Ember.Controller.extend({
    isLoading: true,
    componentProperty: false,
    actions: {
        didNavigate: function(url){
            console.log('didNavigate', url)
            this.set('isLoading', false)
        },
        saveCandidate: function(name, url, playPauseAction, stopAction, nextAction, previousAction) {
            let store = this.get('store');

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

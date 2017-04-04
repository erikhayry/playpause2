import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        let store = this.get('store');

        return store.findAll('station').then((data) => {
            //TODO only add once and mve to service?
            if(data.content.length === 0){
                let station = store.createRecord('station', {
                    name: 'SR.se',
                    url: 'http://sr.se',
                    playPauseAction: 'console.log("playPauseAction")',
                    stopAction: 'console.log("stopAction")',
                    nextAction: 'console.log("nextAction")',
                    previousAction: 'console.log("previousAction")'
                });
                station.save();
            }
            return data;
        });
    },

    actions: {
        removeStation: function(id){
            this.store.findRecord('station', id, { backgroundReload: false }).then((station) => {
                station.destroyRecord();
            });
        },
        goto: function(route, id){
            this.transitionToRoute(route, id);
        }
    }
});

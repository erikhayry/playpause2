import Ember from 'ember';

export default Ember.Route.extend({
    exampleData: Ember.inject.service(),
    model() {
        let store = this.get('store');

        return store.findAll('station').then((data) => {
            return data;
        });
    },

    actions: {
        removeStation: function(id){
            this.store.findRecord('station', id, { backgroundReload: false }).then((station) => {
                station.destroyRecord();
            });
        },
        loadSampleStations: function(){
            this.get('exampleData').load();
        },
        goto: function(route, id){
            this.transitionToRoute(route, id);
        }
    }
});

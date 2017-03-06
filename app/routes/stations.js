import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        return this.get('store').findAll('station');
    },

    actions: {
        addStation: function(name, url, selector) {
            let station = this.store.createRecord('station', {
                name: name,
                url: url,
                selector: selector
            });
            station.save();
        },
        removeStation: function(id){
            this.store.findRecord('station', id, { backgroundReload: false }).then(function(station) {
                station.destroyRecord(); //
            });
        }
    }
});

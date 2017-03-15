import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        let store = this.get('store');

        return store.findAll('station').then(function(data){
            //TODO only add once and mve to service?
            if(data.content.length === 0){
                let station = store.createRecord('station', {
                    name: 'SR.se',
                    url: 'http://sr.se',
                    id: undefined,
                    className: 'player-play',
                    type: 'BUTTON'
                });
                station.save();
            }
            return data;
        });
    },

    actions: {
        addStation: function(name, url, id, className, type) {
            let station = this.store.createRecord('station', {
                name: name,
                url: url,
                idName: id,
                className: className,
                type: type
            });
            station.save();
        },
        removeStation: function(id){
            this.store.findRecord('station', id, { backgroundReload: false }).then(function(station) {
                station.destroyRecord();
            });
        }
    }
});

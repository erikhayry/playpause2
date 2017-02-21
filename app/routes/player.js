import Ember from 'ember';

export default Ember.Route.extend({
    model(params) {
        //return this.get('store').findRecord('station', params.id);
        return {
            name: 'SR',
            url: 'http://sr.se',
            id: 1
        }
    }
});

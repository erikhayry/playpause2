import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        //return this.get('store').findRecord('user', 1);
        return {
            name: "Erik",
            stations: [
                {
                    name: 'SR',
                    url: 'http://sr.se',
                    id: 1
                }
            ]
        }
    }
});

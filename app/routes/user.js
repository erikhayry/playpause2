/*import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.get('store').findRecord('user', 1);
/!*        return {
            name: "Erik",
            stations: [
                {
                    name: 'SR',
                    url: 'http://sr.se',
                    id: 1
                }
            ]
        }*!/
    },
    actions: {
        addUser: () => {
            this.get('store').createRecord('user', {
                title: 'Rails is Omakase',
                body: 'Lorem ipsum'
            });
        }
    }
});*/

import Ember from "ember";

export default Ember.Route.extend({
    model: function() {
        var store = this.store;
        //return store.findRecord('user', 1);
        return {
            name: 'Erik'
        }
    },

    actions: {
        addUser: function(name) {
            let user = this.store.createRecord('user', { id: '2', name: 'Erik 2'});
            user.save();
        }
    }
});

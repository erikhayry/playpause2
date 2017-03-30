import Ember from 'ember';

export default Ember.Component.extend({
    didReceiveAttrs() {
        this._super(...arguments);
        let value = this.get('value');
        if(!value){
            this.set('value', '');
        }
    },
    actions: {
        valueUpdated: function(value){
            console.log('valueUpdated', value, this.get('action'));
            this.sendAction('update', value, this.get('action'));
        }
    }
});

import Ember from 'ember';

export default Ember.Component.extend({
    didReceiveAttrs() {
        this._super(...arguments);
        let value = this.get('value');
        if(!value){
            this.set('value', "Empty");
        }
    },
    actions: {
        valueUpdated: function(value){
            console.log(value, this.get('action'))
            this.sendAction('update', value, this.get('action'))
        }
    }
});

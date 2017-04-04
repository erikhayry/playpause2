import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        removeStation: function(id){
            let that = this;
            this.store.findRecord('station', id, { backgroundReload: false }).then((station) => {
                return station.destroyRecord();
            }).then(() => {
                that.transitionToRoute('stations');
            });
        },
    }
});

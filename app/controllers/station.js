import Ember from 'ember';

export default Ember.Controller.extend({
    resetActiveActions: function(){
        this.set('previousActionActive', false);
        this.set('playPauseActionActive', false);
        this.set('nextActionActive', false);
        this.set('stopActionActive', false);
    },
    actions: {
        removeStation: function(id){
            let that = this;
            this.store.findRecord('station', id, { backgroundReload: false }).then((station) => {
                return station.destroyRecord();
            }).then(() => {
                that.transitionToRoute('stations');
            });
        },
        activeAction: function(currentAction){
            console.log('activeAction', currentAction);
            //TODO refactor
            switch (currentAction){
                case 'previous':
                    this.set('previousActionActive', true);
                    break;
                case 'playpause':
                    this.set('playPauseActionActive', true);
                    break;
                case 'next':
                    this.set('nextActionActive', true);
                    break;
                case 'stop':
                    this.set('stopActionActive', true);
                    break;
            }

            Ember.run.later((function() {
                this.resetActiveActions();
            }).bind(this), 2000);
        }
    }
});

import Ember from 'ember';

export default Ember.Controller.extend({
    isLoading: true,
    componentProperty: false,
    actions: {
        didNavigate(url){
            console.log('didNavigate', url);
            this.set('isLoading', false);
        },
        save(name, url, playPauseAction, stopAction, nextAction, previousAction) {
            console.log('save', name, url, playPauseAction, stopAction, nextAction, previousAction);
            let that = this;

            this.store.findRecord('station', this.get('model').id).then((station) => {
                //TODO set all in one
                station.set('name', name);
                station.set('url', url);
                station.set('playPauseAction', playPauseAction);
                station.set('stopAction', stopAction);
                station.set('nextAction', nextAction);
                station.set('previousAction', previousAction);

                station.save();
                that.transitionToRoute('stations');
            });
        }
    }
});

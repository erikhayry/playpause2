import Ember from 'ember';

export default Ember.Controller.extend({
    isLoading: true,
    componentProperty: false,
    actions: {
        didNavigate: function(url){
            console.log('didNavigate', url)
            this.set('currentUrl', 'test')
            this.set('isLoading', false)
        },
        saveCandidate: function(name, url, id, className, type) {
            let store = this.get('store');

            console.log('saveCandidate', name, url, className, type);
            let station = this.store.createRecord('station', {
                name: name,
                url: url,
                id: id,
                className: className,
                type: type
            });
            station.save();
            this.transitionToRoute('stations');
        }
    }
});

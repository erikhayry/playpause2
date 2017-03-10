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
        onCandidatesFound: function(candidates){
            console.log('onCandidatesFound', candidates)
        }
    }
});

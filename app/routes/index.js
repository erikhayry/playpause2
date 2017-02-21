import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel(/* transition */) {
        this.transitionTo('user', 1); // Implicitly aborts the on-going transition.
    }
});

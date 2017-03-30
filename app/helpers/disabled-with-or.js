import Ember from 'ember';

export function disabledWithOr(params) {
    return params.some(function(arg){
        return arg;
    });
}

export default Ember.Helper.helper(disabledWithOr);

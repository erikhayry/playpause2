import Ember from 'ember';

export function disabledWithOr(params/*, hash*/) {
    let arg1 = params[0];
    let arg2 = params[1];
  return params.some(function(arg){
    return arg
  });
}

export default Ember.Helper.helper(disabledWithOr);

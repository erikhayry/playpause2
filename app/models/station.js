import Model from 'ember-pouch/model';
import DS from 'ember-data';

const {
  attr
} = DS;

export default Model.extend({
    name: attr('string'),
    url: attr('string'),
    playPauseAction: attr('string'),
    stopAction: attr('string'),
    nextAction: attr('string'),
    previousAction: attr('string')
});

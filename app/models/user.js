import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
    name: DS.attr(),
    stations: DS.hasMany('station', {async: true})
});

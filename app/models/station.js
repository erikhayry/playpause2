import DS from 'ember-data';

export default DS.Model.extend({
    url: DS.attr(),
    name: DS.attr(),
    user: DS.belongsTo('user', {async: true})
});

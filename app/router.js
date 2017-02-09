import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('player', { path: '/player/:id' });
  this.route('user',  { path: '/user/:id' });
});

export default Router;

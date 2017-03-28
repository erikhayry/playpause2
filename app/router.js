import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('station', { path: '/station/:id' });
  this.route('stations');
  this.route('add-scripted-station');
});

export default Router;

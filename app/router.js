import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('segment', function() {
    this.route('view', { path: '/:type/:id' });
  });
});

export default Router;

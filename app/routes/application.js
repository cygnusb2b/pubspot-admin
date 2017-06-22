import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  actions: {
    linkTo(name) {
      this.transitionTo(name);
    },
  },
});

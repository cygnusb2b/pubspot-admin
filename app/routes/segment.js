import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  fauxApi: service(),
  errorNotifier: service(),
  loadingOverlay: service(),

  model(params) {
    this.get('loadingOverlay').show();
    return this.get('fauxApi').getSectionSegment(params.id)
      .catch(errors => this.get('errorNotifier').notify(errors))
      .finally(() => this.get('loadingOverlay').hide())
    ;
  },
});

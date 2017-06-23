import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  fauxApi: service(),

  segmentId: null,
  segmentType: null,
  reportType: null,

  loaded: false,
  loading: false,
  error: null,
  data: null,

  init() {
    this._super(...arguments);
    this.send('loadReportData');
  },

  canLoadData: computed.and('segmentId', 'segmentType', 'reportType'),

  noLoadReason: computed('segmentId', 'segmentType', 'reportType', function() {
    if (!this.get('segmentId')) {
      return 'No segment identifier was provided.';
    }
    if (!this.get('segmentType')) {
      return 'No segment type was provided.';
    }
    if (!this.get('reportType')) {
      return 'No report type was provided';
    }
    return null;
  }),

  actions: {
    loadReportData() {
      this.set('data', null);
      this.set('loading', true);
      this.set('error', null);

      if (!this.get('canLoadData')) {
        this.set('loading', false);
        this.set('loaded', true);
        this.set('error', this.get('noLoadReason'));
        return;
      }
      this.get('fauxApi').retrieveSegmentReport(
        this.get('segmentType'),
        this.get('segmentId'),
        this.get('reportType')
      ).then((results) => this.set('data', results))
      .catch((errors) => this.set('error', errors[0].detail))
      .finally(() => {
        this.set('loading', false);
        this.set('loaded', true);
      });
    },
  },

});

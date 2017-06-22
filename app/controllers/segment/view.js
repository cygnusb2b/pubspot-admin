import Ember from 'ember';
import moment from 'moment';

const { Controller, computed } = Ember;

export default Controller.extend({

  isDateRangeOpen: false,
  endDate: moment(),
  center: moment(),
  startDate: computed('endDate', function() {
    return moment(this.get('end')).subtract(30, 'days');
  }),
  dateRange: computed('startDate', 'endDate', function() {
    return {
      start: this.get('startDate'),
      end: this.get('endDate'),
    }
  }),

  actions: {
    openRangeSelector() {
      this.set('isDateRangeOpen', true);
    },
  },
});

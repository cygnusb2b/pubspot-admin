import Ember from 'ember';
import numeral from 'numeral';

const { Component, computed, get } = Ember;

export default Component.extend({

  data: null,
  count: 0,

  _series: computed('data', function() {
    console.info('data', this.get('data.'));
    const series = {
      type: 'pie',
      name: 'Sessions',
      data: [],
    };
    const report = this.get('data.0');
    if (report) {
      series.data.pushObject({ y: get(report, 'identified'), name: 'Identified' });
      series.data.pushObject({ y: get(report, 'anonymous'), name: 'Anonymous' });
    }
    return series;
  }),

  didInsertElement() {
    const _this = this;
    this.$().highcharts({
      title: {
          text: null
      },
      tooltip: {
        formatter: function() {
          return '<b>'+ this.point.name +'</b><br/>'+
            this.series.name +': '+
            numeral(this.y).format('0,0') + ' of ' +
            numeral(_this.get('data.0.total')).format('0,0') + ' ' +
            '(' + numeral(this.y / _this.get('data.0.total')).format('00.0%') + ')'
          ;
        }
      },
      series: [this.get('_series')],
    });
  }
});

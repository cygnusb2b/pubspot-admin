import Ember from 'ember';
import numeral from 'numeral';

const { Component, computed, get } = Ember;

export default Component.extend({

  data: null,

  _series: computed('data', function() {
    const series = {
      type: 'pie',
      name: 'Visits',
      data: [],
    };
    const report = this.get('data');
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
          const name = `<strong style="color:${this.point.color}">${this.point.name}</strong>`;
          const value =
            this.series.name +': '+
            numeral(this.y).format('0,0') + ' of ' +
            numeral(_this.get('data.total')).format('0,0') + ' ' +
            '(' + numeral(this.y / _this.get('data.total')).format('00.0%') + ')'
          ;
          return `${name}<br>${value}`;
        }
      },
      series: [this.get('_series')],
    });
  }
});

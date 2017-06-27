import Ember from 'ember';
import numeral from 'numeral';

const { Component, computed, get } = Ember;

export default Component.extend({

  title: null,
  data: null,


  total: computed('data.@each.count', function() {
    let total = 0;
    this.get('data').forEach(row => total = total + row.count);
    return total;
  }),

  _series: computed('data.[]', function() {
    const series = {
      type: 'pie',
      name: 'Users',
      data: [],
    };
    const report = this.get('data');
    if (report) {
      let other = 0;
      report.forEach((row) => {
        const count = get(row, 'count');
        const percent = count / this.get('total');
        if (percent >= 0.035) {
          series.data.pushObject({ y: count, name: get(row, 'code') });
        } else {
          other = other + count;
        }
      });
      if (other) {
        series.data.pushObject({ y: other, name: 'Others' });
      }
    }
    return series;
  }),

  didInsertElement() {
    const _this = this;
    this.$().highcharts({
      title: {
          text: this.get('title'),
      },
      tooltip: {
        formatter: function() {
          const name = `<strong style="color:${this.point.color}">${this.point.name}</strong>`;
          const value =
            this.series.name +': '+
            numeral(this.y).format('0,0')
             + ' of ' +
            numeral(_this.get('total')).format('0,0') + ' ' +
            '(' + numeral(this.y / _this.get('total')).format('00.0%') + ')'
          ;
          return `${name}<br>${value}`;
        }
      },
      series: [this.get('_series')],
    });
  }
});

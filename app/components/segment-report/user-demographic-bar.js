import Ember from 'ember';
import numeral from 'numeral';

const { Component, computed, get } = Ember;

export default Component.extend({

  data: null,

  _values: computed('data.values.[]', function() {
    return this.get('data.values');
  }),

  _valuesSorting: ['count:desc'],
  _valuesSorted: computed.sort('_values', '_valuesSorting'),

  _categories: computed('_valuesSorted.[]', function() {
    return this.get('_valuesSorted').map(row => get(row, 'label'));
  }),

  _series: computed('_valuesSorted.[]', function() {
    const data = this.get('_valuesSorted').map(row => get(row, 'count'));
    return [{
      name: 'Users',
      data,
    }];
  }),

  didInsertElement() {
    const _this = this;
    this.$().highcharts({
      title: {
          text: this.get('data.label'),
      },
      chart: {
        type: 'bar',
      },
      tooltip: {
        shared: true,
        formatter: function () {
          let s = `<strong>${this.x}</strong>`;
          this.points.forEach((point) => {
            const percent = numeral(point.y / _this.get('data.count')).format('0.0%');
            const name = `${point.series.name}:`;
            const value = `${numeral(point.y).format('0,0')} (${percent})`;
            s += `<br>${name} ${value}`;
          });
          return s;
        },
      },
      xAxis: {
        categories: this.get('_categories'),
        title: {
          text: null,
        }
      },
      yAxis: {
        title: {
          text: 'Users',
        },
      },
      series: this.get('_series'),
    });
  }
});

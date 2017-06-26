import Ember from 'ember';
import numeral from 'numeral';

const { Component, computed } = Ember;

export default Component.extend({

  data: null,

  _categories: computed('data.[]', function() {
    return this.get('data').map(row => `${row.date.month}/${row.date.day}`);
  }),

  _series: computed('data.[]', function() {
    const anonymous = {
      name: 'Anonymous',
      data: [],
    };
    const identified = {
      name: 'Identified',
      data: [],
    };
    this.get('data').forEach((row) => {
      anonymous.data.pushObject(row.anonymous);
      identified.data.pushObject(row.identified);
    });
    return [anonymous, identified];
  }),

  didInsertElement() {
    this.$().highcharts({
      title: {
          text: null
      },
      chart: {
        type: 'area',
      },
      tooltip: {
        shared: true,
        formatter: function () {
          let s = `<strong>${this.x}</strong>`;
          this.points.forEach((point) => {
            const name = `<span style="color:${point.color}">${point.series.name}</span>:`;
            const value = `${numeral(point.y).format('0,0')} Visits`;
            s += `<br>${name} ${value}`;
          });
          return s;
        },
      },
      xAxis: {
        categories: this.get('_categories'),
      },
      yAxis: {
        title: {
          text: 'Visits',
        },
      },
      series: this.get('_series'),
    });
  }
});

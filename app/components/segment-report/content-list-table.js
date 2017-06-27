import Ember from 'ember';

const { Component, $ } = Ember;

export default Component.extend({
  tagName: 'table',
  classNames: ['table'],

  data: null,
  headers: [
    { key: 'type', label: 'Type' },
    { key: 'title', label: 'Title' },
    { key: 'total', label: 'Views (Total)' },
    { key: 'identified', label: 'Views (Identified)' },

  ],
  title: 'Content Details',

  didInsertElement() {
    const title = this.get('title');
    const table = this.$().DataTable({
      aaSorting: [[2, 'desc']],
      buttons: [
        { extend: 'excelHtml5', title: title, exportOptions: { orthogonal: 'export' } },
        { extend: 'csvHtml5', title: title, exportOptions: { orthogonal: 'export' } },
      ],
    });

    $(table.table().container()).addClass('px-0');

    table.buttons().container()
      .addClass('float-right')
      .appendTo('#' + this.$().attr('id') + '_wrapper .col-md-6:eq(1)')
    ;
  },
});

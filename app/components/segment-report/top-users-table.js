import Ember from 'ember';

const { Component, $ } = Ember;

export default Component.extend({
  tagName: 'table',
  classNames: ['table'],

  topUsers: null,
  headers: [
    { key: 'email', label: 'Email Address' },
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'company_name', label: 'Company Name' },
    { key: 'actions', label: 'Interactions' },
  ],
  title: 'Most Engaged Users',

  didInsertElement() {
    const title = this.get('title');
    const table = this.$().DataTable({
      aaSorting: [[4, 'desc']],
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

import Ember from 'ember';

const { Controller, computed, run, inject: { service } } = Ember;

export default Controller.extend({

  fauxApi: service(),
  loadingOverlay: service(),
  errorNotifier: service(),

  segmentTypes: [
    { value: 'website-channel', label: 'Website Channel' },
    { value: 'website-section', label: 'Website Section' },
    // { value: 'newsletter-section', label: 'Newsletter Section' },
    // { value: 'magazine-section', label: 'Magazine Section' },
    { value: 'taxonomy-category', label: 'Taxonomy (Category)' },
    { value: 'content-company', label: 'Company' },
  ],

  segmentOptions: [],

  segmentTypeSorting: ['value'],
  segmentTypesSorted: computed.sort('segmentTypes', 'segmentTypeSorting'),

  loadingError: null,
  loadingSegments: false,
  searchPhrase: null,

  segment: null,
  segmentType: null,

  canSubmit: computed('isSegmentTypeSelected', 'isSegmentSelected', function() {
    return this.get('isSegmentTypeSelected') && this.get('isSegmentSelected') ? true : false;
  }),

  isSegmentSelected: computed('segment', function() {
    return this.get('segment') ? true : false;
  }),

  isSegmentTypeSelected: computed('segmentType', function() {
    return this.get('segmentType') ? true : false;
  }),

  _searchSegments() {
    this.set('loadingError', null);

    const type = this.get('segmentType');
    const phrase = this.get('searchPhrase');

    if (this.get('loadingSegments') || !phrase || !type) {
      return;
    }
    this.get('loadingOverlay').show();
    this.set('loadingSegments', true);

    this.get('fauxApi').searchForSegment(type.value, phrase)
      .then((results) => {
        results.forEach(result => this.get('segmentOptions').pushObject(result));
      })
      .catch((errors) => this.get('errorNotifier').notify(errors))
      .finally(() => {
        this.set('loadingSegments', false);
        this.get('loadingOverlay').hide();
      })
    ;
  },

  actions: {
    clearSegmentOptions() {
      this.get('segmentOptions').clear();
    },
    setType(type) {
      this.set('segment', null);
      this.send('clearSegmentOptions');
      if (!type) {
        this.set('segmentType', null);
      } else {
        this.set('segmentType', type);
      }
    },
    setSegment(segment) {
      if (segment) {
        this.set('segment', segment);
      } else {
        this.set('segment', null);
      }
    },
    searchForSegments(phrase) {
      this.send('clearSegmentOptions');
      this.set('searchPhrase', phrase);
      run.debounce(this, this._searchSegments, 600);
    },
    viewSegment() {
      this.transitionToRoute('segment.view', this.get('segmentType.value'), this.get('segment._id'));
    },
  },
});

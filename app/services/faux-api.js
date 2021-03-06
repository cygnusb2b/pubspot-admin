import Ember from 'ember';

const { Service, $, RSVP: { Promise } } = Ember;

export default Service.extend({
  searchForSegment(type, phrase) {
    return this._handle(
      $.ajax({
        url: `/api/segment/search/${type}/${encodeURIComponent(phrase)}`,
        method: 'GET',
        dataType: 'json',
      })
    );
  },

  retrieveSegmentReport(type, id, reportKey, params) {
    let query = '';
    if (typeof params === 'object') {
      const flattened = $.param(params);
      if (flattened) {
        query = `?${flattened}`;
      }
    }
    return this._handle(
      $.ajax({
        url: `/api/segment/report/${type}/${id}/${reportKey}${query}`,
        method: 'GET',
        dataType: 'json',
      })
    );
  },

  retrieveSegment(type, id) {
    return this._handle(
      $.ajax({
        url: `/api/segment/retrieve/${type}/${id}`,
        method: 'GET',
        dataType: 'json',
      })
    );
  },

  _promise(ajax) {
    return new Promise((resolve, reject) => {
      ajax.done((response) => {
        resolve(response);
      }).fail((jqXHR) => {
        if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
          reject(jqXHR.responseJSON.errors);
        } else {
          reject([]);
        }
      });
    });
  },

  _handle(ajax) {
    return this._promise(ajax)
      .then(response => {
        if (Array.isArray(response.data)) {
          return response.data
        }
        return Object.assign({}, response.data || {}, { _meta: response.meta || {} });
      })
    ;
  },
});

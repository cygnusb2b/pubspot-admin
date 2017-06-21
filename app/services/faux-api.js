import Ember from 'ember';

const { Service, $, RSVP: { Promise } } = Ember;

export default Service.extend({
  getSectionSegment(id) {
    return this._handle(
      $.ajax({
        url: `/segment/section/${id}`,
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
        reject(jqXHR.responseJSON.errors || []);
      });
    });
  },

  _handle(ajax) {
    return this._promise(ajax)
      .then(response => response.data)
    ;
  },
});

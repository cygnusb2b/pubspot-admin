import Ember from 'ember';

const { RSVP: { Promise } } = Ember;

export default function wrap($ajax) {
  return new Promise((resolve, reject) => {
    $ajax.done((response, textStatus, jqXHR) => {
      resolve({ response, textStatus, jqXHR });
    }).fail((jqXHR) => {
      reject(jqXHR.responseJSON || {});
    });
  });
}

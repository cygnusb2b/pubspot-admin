import Ember from 'ember';

const { Service, inject: { service }, typeOf, isEmpty } = Ember;

export default Service.extend({
  _notify: service('notify'),

  notify(errors, closeAfter = null) {

    const notify = this.get('_notify');

    if (errors instanceof Error) {
      this.get('_notify').error({
        closeAfter: closeAfter,
        html: this.extractErrorMessage({ title: 'Client Error', detail: errors.message }, true),
      });
      // eslint-disable-next-line no-console
      console.error(errors);
      return;
    }

    if (isEmpty(errors)) {
      notify.error({
        closeAfter: closeAfter,
        html: this.extractErrorMessage(null, true),
      });
      return;
    }
    errors.forEach(error => {
      this.get('_notify').error({
        closeAfter: closeAfter,
        html: this.extractErrorMessage(error, true),
      });
    });
  },

  extractErrorMessage(error, asHtml = false) {
    if ('object' !== typeOf(error)) {
      error = this._getDefaultError();
    }
    if (asHtml) {
      return '<strong>' + error.title + '</strong><br>' + error.detail;
    }
    return error.title + ': ' + error.detail;
  },

  _getDefaultError() {
    return {
      title: 'Fatal Error',
      detail: 'An unknown server error was encountered.',
    };
  },

});

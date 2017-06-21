import Ember from 'ember';

const { Service, $ } = Ember;

export default Service.extend({
  selector: '.loading-overlay',

  show() {
    this._getElement().show();
  },

  hide() {
    this._getElement().hide();
  },

  toggle() {
    this._getElement().toggle();
  },

  _getElement() {
    return $(this.get('selector'));
  }
});

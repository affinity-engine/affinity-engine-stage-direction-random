import Ember from 'ember';
import { Direction } from 'ember-theater-director';

const {
  get,
  getProperties,
  isPresent,
  set,
  setProperties,
  typeOf
} = Ember;

export default Direction.extend({
  _setup(firstNumber = 1, secondNumber = 0) {
    this._entryPoint();

    const attrs = get(this, 'attrs');

    setProperties(attrs, {
      firstNumber,
      secondNumber
    });

    return this;
  },

  float(float = true) {
    set(this, 'attrs.float', float);

    return this;
  },

  _perform(priorSceneRecord, resolve) {
    resolve(isPresent(priorSceneRecord) ? priorSceneRecord : this._generateRandomNumber());
  },

  _generateRandomNumber() {
    const attrs = get(this, 'attrs');
    const {
      float,
      firstNumber,
      secondNumber
    } = getProperties(attrs, 'float', 'firstNumber', 'secondNumber');

    const [min, max] = firstNumber < secondNumber ? [firstNumber, secondNumber] : [secondNumber, firstNumber];

    return float ? this._generateFloat(min, max, float) : this._generateInt(min, max);
  },

  _generateInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  _generateFloat(min, max, float) {
    let number = Math.random() * (max - min) + min;

    if (typeOf(float) === 'number') {
      number = parseFloat(number.toFixed(float));
    }

    return number;
  }
});

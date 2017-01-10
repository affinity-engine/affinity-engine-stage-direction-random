import Ember from 'ember';
import { Direction, cmd } from 'affinity-engine-stage';
import { task, timeout } from 'ember-concurrency';

const {
  get,
  getProperties,
  set,
  setProperties,
  typeOf
} = Ember;

export default Direction.extend({
  _setup: cmd({ async: true }, function(firstNumber = 1, secondNumber = 0) {
    const attrs = get(this, 'attrs');

    setProperties(attrs, {
      firstNumber,
      secondNumber
    });

    get(this, '_resolveTask').perform();
  }),

  float: cmd(function(float = true) {
    set(this, 'attrs.float', float);
  }),

  _resolveTask: task(function * () {
    yield timeout(10);

    const attrs = get(this, 'attrs');
    const {
      float,
      firstNumber,
      secondNumber
    } = getProperties(attrs, 'float', 'firstNumber', 'secondNumber');

    const [min, max] = firstNumber < secondNumber ? [firstNumber, secondNumber] : [secondNumber, firstNumber];

    this.resolve(float ? this._generateFloat(min, max, float) : this._generateInt(min, max));
  }),

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

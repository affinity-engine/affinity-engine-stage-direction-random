import Ember from 'ember';
import { Direction, cmd } from 'affinity-engine-stage';
import { task, timeout } from 'ember-concurrency';

const {
  assign,
  get,
  typeOf
} = Ember;

export default Direction.extend({
  _setup: cmd({ async: true }, function(firstNumber = 1, secondNumberOrOptions, onlyOptions) {
    const secondNumber = typeOf(secondNumberOrOptions) === 'number' ? secondNumberOrOptions : 0;
    const options = (typeOf(secondNumberOrOptions) === 'number' ? onlyOptions : secondNumberOrOptions) || {};

    this.configure(assign({
      firstNumber,
      secondNumber
    }, options));

    get(this, '_resolveTask').perform();
  }),

  _resolveTask: task(function * () {
    yield timeout(10);

    const {
      float,
      firstNumber,
      secondNumber
    } = this.getConfiguration('float', 'firstNumber', 'secondNumber');

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

import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../../../tests/helpers/module-for-acceptance';
import { $hook } from 'ember-hook';

const getDataNumber = function getDataNumber() {
  return parseInt($hook('data').text().trim(), 10);
};

moduleForAcceptance('Acceptance | ember-theater/director/directions/random', {
  beforeEach() {
    Ember.$.Velocity.mock = true;
  },

  afterEach() {
    Ember.$.Velocity.mock = false;
  }
});

test('Ember Theater | Director | Directions | Random', function(assert) {
  visit('/ember-theater/test-scenarios/director/directions/random').then(() => {
    assert.ok([0, 1, 2].indexOf(getDataNumber()) > -1, 'single argument is valid');

    return step(25);
  }).then(() => {
    assert.ok([3, 4].indexOf(getDataNumber()) > -1, 'two arguments creates a range');

    return step(25);
  }).then(() => {
    const number = parseFloat($hook('data').text().trim());

    assert.ok(number > 0 && number < 1, 'float creates a float');

    return step(25);
  }).then(() => {
    assert.ok(['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9'].indexOf($hook('data').text().trim()) > -1, 'floats can get be fixed');
  });
});

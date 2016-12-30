import { test } from 'qunit';
import moduleForAcceptance from '../../../../tests/helpers/module-for-acceptance';
import { $hook } from 'ember-hook';

const getDataNumber = function getDataNumber() {
  return parseInt($hook('data').text().trim(), 10);
};

moduleForAcceptance('Acceptance | affinity-engine/stage/directions/random');

test('Affinity Engine | stage | Directions | Random', function(assert) {
  visit('/affinity-engine/test-scenarios/stage/directions/random');

  andThen(() => {
    assert.ok([0, 1, 2].indexOf(getDataNumber()) > -1, 'single argument is valid');
  });

  step(25);

  andThen(() => {
    assert.ok([3, 4].indexOf(getDataNumber()) > -1, 'two arguments creates a range');
  });

  step(25);

  andThen(() => {
    const number = parseFloat($hook('data').text().trim());

    assert.ok(number > 0 && number < 1, 'float creates a float');
  });

  step(25);

  andThen(() => {
    assert.ok(['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9'].indexOf($hook('data').text().trim()) > -1, 'floats can get be fixed');
  });
});

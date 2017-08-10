import { Scene, step } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';
import { $hook } from 'ember-hook';

export default Scene.extend({
  name: 'Random Direction Test',

  start: task(function * (script) {
    const $data = $hook('data');

    let number = yield script.random(2);

    $data.text(number);

    yield step();

    number = yield script.random(3, 4);

    $data.text(number);

    yield step();

    number = yield script.random(0, 1, { float: true });

    $data.text(number);

    yield step();

    number = yield script.random(0, 1, { float: 1 });

    $data.text(number);
  })
});

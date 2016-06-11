import { Scene, step } from 'ember-theater-director';
import { $hook } from 'ember-hook';

export default Scene.extend({
  name: 'Random Direction Test',

  start: async function(script) {
    const $data = $hook('data');

    let number = await script.random(2);

    $data.text(number);

    await step();

    number = await script.random(3, 4);

    $data.text(number);

    await step();

    number = await script.random(0, 1).float();

    $data.text(number);

    await step();

    number = await script.random(0, 1).float(1);

    $data.text(number);
  }
});

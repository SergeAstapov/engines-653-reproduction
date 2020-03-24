import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupEngineTest } from '../../../../helpers/engine-test';

module('Integration | Component | Available Discounts | Empty Message', function (hooks) {
  setupRenderingTest(hooks);
  setupEngineTest(hooks, 'engines-repro', 'real-rewards');

  test('it renders', async function (assert) {
    await render(hbs`<Summary::EmptyMessage/>`);

    assert.dom('h4').exists();
  });
});

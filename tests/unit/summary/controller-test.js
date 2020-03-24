import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupEngineTest } from '../../helpers/engine-test';

module('Unit | Summary | Controller', function (hooks) {
  setupTest(hooks);
  setupEngineTest(hooks, 'engines-repro', 'real-rewards');

  test('it exists', function (assert) {
    assert.ok(this.engine.lookup('controller:summary'));
  });
});

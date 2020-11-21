import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | kreis/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:kreis/index');
    assert.ok(route);
  });
});

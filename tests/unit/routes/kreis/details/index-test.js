import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | kreis/details/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:kreis/details/index');
    assert.ok(route);
  });
});

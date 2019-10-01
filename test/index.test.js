const assert = require('assert');
const hooks = require('../lib/index');

describe('feathers-authentication-hooks', () => {
  it('exposes setField', () => {
    assert.ok(typeof hooks.setField === 'function');
  });
});

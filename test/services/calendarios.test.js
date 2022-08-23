const assert = require('assert');
const app = require('../../src/app');

describe('\'calendarios\' service', () => {
  it('registered the service', () => {
    const service = app.service('calendarios');

    assert.ok(service, 'Registered the service');
  });
});

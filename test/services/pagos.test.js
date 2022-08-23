const assert = require('assert');
const app = require('../../src/app');

describe('\'pagos\' service', () => {
  it('registered the service', () => {
    const service = app.service('pagos');

    assert.ok(service, 'Registered the service');
  });
});

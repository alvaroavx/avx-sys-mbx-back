const assert = require('assert');
const app = require('../../src/app');

describe('\'alertas\' service', () => {
  it('registered the service', () => {
    const service = app.service('alertas');

    assert.ok(service, 'Registered the service');
  });
});

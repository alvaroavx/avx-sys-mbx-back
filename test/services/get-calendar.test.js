const assert = require('assert');
const app = require('../../src/app');

describe('\'get-calendar\' service', () => {
  it('registered the service', () => {
    const service = app.service('get-calendar');

    assert.ok(service, 'Registered the service');
  });
});

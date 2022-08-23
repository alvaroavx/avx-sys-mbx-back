const assert = require('assert');
const app = require('../../src/app');

describe('\'typeform\' service', () => {
  it('registered the service', () => {
    const service = app.service('typeform');

    assert.ok(service, 'Registered the service');
  });
});

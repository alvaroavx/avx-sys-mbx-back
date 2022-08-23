const assert = require('assert');
const app = require('../../src/app');

describe('\'mbx\' service', () => {
  it('registered the service', () => {
    const service = app.service('mbx');

    assert.ok(service, 'Registered the service');
  });
});

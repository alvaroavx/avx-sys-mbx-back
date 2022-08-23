const assert = require('assert');
const app = require('../../src/app');

describe('\'agendamiento\' service', () => {
  it('registered the service', () => {
    const service = app.service('agendamiento');

    assert.ok(service, 'Registered the service');
  });
});

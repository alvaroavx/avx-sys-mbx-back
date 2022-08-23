const assert = require('assert');
const app = require('../../src/app');

describe('\'tareas\' service', () => {
  it('registered the service', () => {
    const service = app.service('tareas');

    assert.ok(service, 'Registered the service');
  });
});

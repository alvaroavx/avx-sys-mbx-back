const assert = require('assert');
const app = require('../../src/app');

describe('\'actividades\' service', () => {
  it('registered the service', () => {
    const service = app.service('actividades');

    assert.ok(service, 'Registered the service');
  });
});

const assert = require('assert');
const app = require('../../src/app');

describe('\'evaluaciones\' service', () => {
  it('registered the service', () => {
    const service = app.service('evaluaciones');

    assert.ok(service, 'Registered the service');
  });
});

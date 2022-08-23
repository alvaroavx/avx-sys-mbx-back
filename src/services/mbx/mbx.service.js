// Initializes the `mbx` service on path `/mbx`
const { Mbx } = require('./mbx.class');
const createModel = require('../../models/mbx.model');
const hooks = require('./mbx.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/mbx', new Mbx(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mbx');

  service.hooks(hooks);
};

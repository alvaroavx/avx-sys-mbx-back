// Initializes the `calendarios` service on path `/calendarios`
const { Calendarios } = require('./calendarios.class');
const createModel = require('../../models/calendarios.model');
const hooks = require('./calendarios.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/calendarios', new Calendarios(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('calendarios');

  service.hooks(hooks);
};

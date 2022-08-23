// Initializes the `agendamiento` service on path `/agendamiento`
const { Agendamiento } = require('./agendamiento.class');
const createModel = require('../../models/agendamiento.model');
const hooks = require('./agendamiento.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/agendamiento', new Agendamiento(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('agendamiento');

  service.hooks(hooks);
};

// Initializes the `alertas` service on path `/alertas`
const { Alertas } = require('./alertas.class');
const createModel = require('../../models/alertas.model');
const hooks = require('./alertas.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/alertas', new Alertas(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('alertas');

  service.hooks(hooks);
};

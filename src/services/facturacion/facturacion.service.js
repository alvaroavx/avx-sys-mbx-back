// Initializes the `facturacion` service on path `/facturacion`
const { Facturacion } = require('./facturacion.class');
const createModel = require('../../models/facturacion.model');
const hooks = require('./facturacion.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/facturacion', new Facturacion(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('facturacion');

  service.hooks(hooks);
};

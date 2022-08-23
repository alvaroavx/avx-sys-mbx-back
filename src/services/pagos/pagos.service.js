// Initializes the `pagos` service on path `/pagos`
const { Pagos } = require('./pagos.class');
const createModel = require('../../models/pagos.model');
const hooks = require('./pagos.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pagos', new Pagos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pagos');

  service.hooks(hooks);
};

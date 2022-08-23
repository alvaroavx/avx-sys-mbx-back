// Initializes the `actividades` service on path `/actividades`
const { Actividades } = require('./actividades.class');
const createModel = require('../../models/actividades.model');
const hooks = require('./actividades.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/actividades', new Actividades(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('actividades');

  service.hooks(hooks);
};

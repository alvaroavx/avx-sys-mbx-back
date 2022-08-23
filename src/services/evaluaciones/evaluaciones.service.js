// Initializes the `evaluaciones` service on path `/evaluaciones`
const { Evaluaciones } = require('./evaluaciones.class');
const createModel = require('../../models/evaluaciones.model');
const hooks = require('./evaluaciones.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/evaluaciones', new Evaluaciones(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('evaluaciones');

  service.hooks(hooks);
};

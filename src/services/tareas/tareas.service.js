// Initializes the `tareas` service on path `/tareas`
const { Tareas } = require('./tareas.class');
const createModel = require('../../models/tareas.model');
const hooks = require('./tareas.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/tareas', new Tareas(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('tareas');

  service.hooks(hooks);
};

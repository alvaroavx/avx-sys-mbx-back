// Initializes the `usuarios` service on path `/usuarios`
const { Usuarios } = require('./usuarios.class');
const createModel = require('../../models/usuarios.model');
const hooks = require('./usuarios.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/usuarios', new Usuarios(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('usuarios');

  service.hooks(hooks);
};

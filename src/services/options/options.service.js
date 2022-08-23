// Initializes the `options` service on path `/options`
const { Options } = require('./options.class');
const createModel = require('../../models/options.model');
const hooks = require('./options.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/options', new Options(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('options');

  service.hooks(hooks);
};

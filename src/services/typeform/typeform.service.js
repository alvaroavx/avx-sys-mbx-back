// Initializes the `typeform` service on path `/typeform`
const { Typeform } = require('./typeform.class');
const hooks = require('./typeform.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/typeform', new Typeform(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('typeform');

  service.hooks(hooks);
};

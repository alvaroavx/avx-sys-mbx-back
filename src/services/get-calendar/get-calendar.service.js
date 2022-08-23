// Initializes the `get-calendar` service on path `/get-calendar`
const { GetCalendar } = require('./get-calendar.class');
const hooks = require('./get-calendar.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/get-calendar', new GetCalendar(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('get-calendar');

  service.hooks(hooks);
};

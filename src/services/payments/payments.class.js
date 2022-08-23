const { Service } = require('feathers-mongoose');
const { verifyPayment , makePayment}  = require('./flow.class');
exports.Payments = class Payments extends Service {
  setup(app) {
    this.app=app;
  }


  async create(data, params) {
    if (data.token) {
      return await verifyPayment(data, params).then(valid => {
        if (valid) {
          super._find({ query: { token: data.token } }).then(({data:[tx]}) => {
            const { user, _id, cards } = tx;
            // this.app.service('users')._patch(user, {
            //   $inc:{amount}
            // });

            for (const card of cards) {
              this.app.service('cards')._patch(card,{
                user
              });
            }
            //this.app.service('boards')._patch(user, {
            //  $inc:{amount}
            //});


            super._patch(_id, {
              status:'complete'
            });
          }); 
          
        }
        return  valid;
      });
    }
    else {

      const { token, url } = await makePayment(data);

      data.token = token;
      super.create(data, params);
      return {url};
    }

  }

};

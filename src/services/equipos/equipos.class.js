const { Service } = require('feathers-mongoose');

exports.Equipos = class Equipos extends Service {
  setup(app){

    this.app  = app;
  }
  async  create(data,params){

    const {usuarios} = data;

    for (const usuario of usuarios) {
      this.service('usuarios')._create({
        email:usuario.email,password:Math.random()
      });
    }
    const result =   await this._create(data,params);



    result;
  }
};

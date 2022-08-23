const { Service } = require('feathers-mongoose');
exports.Usuarios = class Usuarios extends Service {
  async create(data,params){
   
    const result =   await this._create(data,params);



    return result;

  }
};

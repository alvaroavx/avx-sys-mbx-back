const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const {emailTool } = require('./services/usuarios/emailTool');

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());

  app.use('/requestPassword',{
    async create(data,params){

      const id = await app.service('usuarios')._find({query:{email:data.email}}).then(a=>a.data[0]._id);
      const key =   Math.floor(Math.random()*10e5).toString().padStart(6,'0');
      app.service('usuarios').patch(id,{password:key});
      emailTool(

        {
          to: data.email, // Change to your recipient
          from: 'MBX Plataforma <hjerez@roje.cl>', // Change to your verified sender
          subject: 'MBX Notificación',
          // text: 'and easy to do anywhere, even with Node.js',
          html: `<strong>Ha olvidado su clave en MBX, su nueva clave es: ${key}</strong>`,
        }
      );

      return Promise.resolve(id);
    }
  });
};

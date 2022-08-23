const { authenticate } = require('@feathersjs/authentication').hooks;

const {emailTool } = require('./emailTool');
const sendInvite = (context)=>{

  const key =   Math.floor(Math.random()*10e5).toString().padStart(6,'0');
  context.data.password = key;

  emailTool(

    {
      to: context.data.email, // Change to your recipient
      from: 'MBX Plataforma <hjerez@roje.cl>', // Change to your verified sender
      subject: 'MBX Notificación',
      // text: 'and easy to do anywhere, even with Node.js',
      html: `<strong>Ha creado una cuenta en MBX, su clave es: ${key}</strong>`,
    }
  );
  return context;
};


const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [  ],
    get: [ ],
    create: [ sendInvite, hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ],
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

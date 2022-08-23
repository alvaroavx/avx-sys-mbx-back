/* eslint-disable no-unused-vars */
exports.Typeform = class Typeform {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
  
    

    const { createClient } = require('@typeform/api-client');
    
    const typeformAPI = createClient({ token: '5nN4qjRzqcnfGgWC7rodGMsx1WG7K6wLoaqAQSGViUmw' });
    
    
    
    const uid = 'KBncGv6I'; // research 
    
    // https://miro.com/app/board/o9J_l5uEaMQ=/
    const preguntas =  await  typeformAPI.forms.get({ uid }).then(a=>a.fields);
    
    
    
    const respuestas = await  typeformAPI.responses.list({ uid }).then(a=>a.items[0].answers);
    
    
    const arr = []; 
    for (const pregunta in preguntas) {
    
      const obj = {};
      const currentPregunta = preguntas[pregunta];
      obj.question = currentPregunta.title;
     
      const respuesta = respuestas.find(a=>a.field.id===currentPregunta.id);
      obj.reply =(respuesta||{}).text;
      arr.push(obj);
    }
    return arr;
    


  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};

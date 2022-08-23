const { Service } = require('feathers-mongoose');
const uniqid = require('uniqid');
const blobService = require('feathers-blob');
const {Storage} = require('@google-cloud/storage');
const fs = require('fs-blob-store');
const tempUploadPath = './public/uploads';
const path = require('path');
const blobStorage = fs(tempUploadPath);
const bucket = 'localstorageserver935';
exports.Uploads = class Uploads extends Service {
  async create(data,params) {

    if(  process.env.NODE_ENV === 'production'){
      return new Promise((resolve,reject)=>{
        const fileName =  `${uniqid()}${data.extension}`   ;
        const newFolder  = `${new Date().toISOString().split('-').slice(0,2).join('-')}`;
        let BS = blobService({ Model: blobStorage });
        BS.create({ uri: data.uri,id: fileName  })
          .then((file) => {
               
            const storage = new Storage();
            storage.bucket(bucket)
              .upload( path.join(tempUploadPath,fileName), {
                destination: path.join(newFolder, fileName),
              }).then((response)=>{
                resolve(this._create({
                  contentType:response[1].contentType,
                  size:file.size,
                  fileName:'https://storage.googleapis.com/'+bucket+'/'+ path.join(newFolder,fileName),
                },params));

              }).catch(reject);

          })
          .catch(reject);

      });
    }
    else{

      return await this._create({contentType:'jpg',size:12345,fileName:'https://i.imgur.com/ly74cdl.png'});
    }


  }
};

 
const emailTemplate = ({bodyHTML,name,to})=>{
  return `<div><div style="
  "><div style="background: #fff;padding: 10px;max-width: 600px;border-radius: 20px;margin: 0 auto;">
   <img src="https://i.imgur.com/wRl45io.png"  style="width: 79px;
   margin-bottom: 40px;"/>
    <div style="
   line-height: 31px;
   font-family: sans-serif;
   font-weight: 200;
   margin: 0 auto;
   ">
        <div style="margin-bottom: 20px;"><b style="font-weight:bold">Hola!</b>  </div>
  <div>${bodyHTML}</div><div>
  <br>Atentamente. <br>El equipo de <b style="font-weight:bold">MBX</b>
      
  </div>
     
    </div>

    <a style="background: #ff2e1f;
    color: white;
    text-decoration: none;
    padding: 10px;
    font-family: sans-serif;
    padding: 10px 20px;
    margin: 20px 0;
    display: inline-block;">Ir a MBX</a>

 
  <div>

  <img  style="width: 300px;
  margin-bottom: 20px;
  margin-top: 20px;
  " src="https://i.imgur.com/5dlYbmN.png" />
  </div>
<div>
<img style="width: 30px;margin-right: 20px;" src="https://i.imgur.com/lNUasTv.png">
<img style="width: 30px;margin-right: 20px;" src="https://i.imgur.com/tHjCz2T.png">
<img style="width: 30px;margin-right: 20px;" src="https://i.imgur.com/blZhrJv.png">
</div>
</div>

     <div style="    margin: 0 auto;
     margin-top: 0px;
     margin-bottom: 0px;
 color: silver;max-width: 800px;
 text-align: justify;
 margin-top: 30px;
 font-size: 75%;
 font-family: sans-serif;
 margin-bottom: 10px;
 text-transform: uppercase;
 border-top: 1px solid silver;
 padding-top: 50px;
">Este correo fue emitido de forma automatizada,
            enviada a la dirección de correo ${to} mediante la plataforma   "MBX", puede cambiar los ajustes de envio de correos
            desde su panel en MBX.</div><div style="padding: 0;margin: 0;font-size: 19px;font-weight: normal;font-family: 'helvetica', sans-serif;margin-bottom: 70px;text-align: center;color: #000;margin-top: 30px;">
        MBX</div>
  </div></div>`;
};
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

exports.emailTool =  ({html,to,subject,name=''})=>{
  if(!subject){
    throw Error('no subject');
  }
  if(!to){
    throw Error('no recipient');
  }
  if(!html){  
    throw Error('no content');
  }

  const msg = {
    to: to, // Change to your recipient
    from: 'MBX <hjerez@roje.cl>', // Change to your verified sender
    subject: subject,
    // text: 'and easy to do anywhere, even with Node.js',
    html: emailTemplate({bodyHTML: html ,name,to}),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error.response.body);
    });
};


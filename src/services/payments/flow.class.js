const CryptoJS = require( 'crypto-js');

function getToSign(formData) {
  let textToSign = '';
  for (const element in formData) {
    textToSign +=element+formData[element];
  }
  // console.log(textToSign);
  return textToSign;
}
const apiKey = '1F326EA3-7C52-4D3B-99E3-5A47CL3732FF';
const secretKey = '5a5669c4c6d5aff79aa16ae053890c9d8a909e0b';
const makePayment = ({amount,description,customerMail,url}) => {
  let formData = {
    'amount': String(amount),
    'apiKey': apiKey,
    'commerceOrder': +new Date(),
    'currency': 'CLP',
    'email': customerMail,
    'subject': description,
    'timeout':60*10, // 10 minutes
    'urlConfirmation': 'https://api.vengaconbingo.com/payments',
    'urlReturn': url
  };
  // Sort by alphabetics, so that the Flow.CL signature is valid
  formData =  Object.keys(formData)
    .sort()
    .reduce((acc, key) => ({
      ...acc, [key]: formData[key]
    }), {});
  var toSign = getToSign(formData);

  var hash = CryptoJS.HmacSHA256(toSign,secretKey);
  const Signature =  hash.toString();


  const payload = Object.assign(formData, { s: Signature });
  var request = require('request');
  let options = {
    'method': 'POST',
    'url': 'https://www.flow.cl/api/payment/create',
    'headers': {
    },
    formData:payload
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) reject(error);
      response.body = JSON.parse(response.body);
      console.log(response.body);
      resolve({url:response.body.url+'?token='+response.body.token,token:response.body.token});
    });
  });

};


const verifyPayment = ({ token }) => {
  const formData ={apiKey, token };
  var toSign = getToSign(formData);
  var hash = CryptoJS.HmacSHA256(toSign,secretKey);
  const Signature = hash.toString();
  var request = require('request');
  let options = {
    'method': 'GET',
    'url': `https://www.flow.cl/api/payment/getStatus?apiKey=${apiKey}&token=${token}&s=${Signature}`,
    'headers': {
    }
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) reject(error);
      response.body = JSON.parse(response.body);
      resolve(Number(response.body.status)===2);
    });
  });
  
};
  
exports.verifyPayment = verifyPayment;
exports.makePayment = makePayment;
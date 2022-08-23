
var http = require( 'http' ),
  querystring = require( 'querystring' ),
  exec = require( 'child_process' ).exec;

setInterval(()=>{
  console.log('git pull');
  exec( 'git pull & say wea', function( error, stdout, stderr ) {
         
  });
},10000);
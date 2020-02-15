const http = require('http') ;
const fs = require('fs') ;

const url = require('url') ;

const server = http.createServer((req , res) => {

  const path = url.parse(req.url).pathname
  
  switch(path){
    case '/':
      res.end('main page');
      break;

    case '/any':
      res.end('any page');
      break;

    case '/user':
      res.end('user page');
      break;

    default:
      res.end('This page not found');
      break;

  }

});


server.listen(3000 , '127.0.0.1' , ()=>{
  console.log('Server is running ....')
});



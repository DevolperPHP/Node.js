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
      fs.readFile('./any.html' , null , (error , data) =>{
        if(error){
          res.end("The file have error")
        } else {
          res.end(data)
        }
      })
      break;

    case '/user':
      fs.readFile('./user.html' , null , (error , data) =>{
        if(error){
          res.end("The file have error")
        } else {
          res.end(data)
        }
      })
      break;

    default:
      res.end('This page not found');
      break;

  }

});


server.listen(3000 , '127.0.0.1' , ()=>{
  console.log('Server is running ....')
});

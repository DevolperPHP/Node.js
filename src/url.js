/*
You will need this file when you make another file that you want to show so the url will be like
http://127.0.0.1/any this code will get the path name 
*/
const http = require('http') ;
const fs = require('fs') ;
const url = require('url') ;

const server = http.createServer((req , res) => {

  const path = url.parse(req.url).pathname // that how to get the path name
  console.log(path)
  fs.readFile('./index.html' , null , (error , data) =>{
    if(error){
      res.end("The file have error")
    } else {
      res.end(data)
    }
  })

});


server.listen(3000 , '127.0.0.1' , ()=>{
  console.log('Server is running ....')
});

const http = require('http') ;
const fs = require('fs') ;

const server = http.createServer((req , res) => {
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

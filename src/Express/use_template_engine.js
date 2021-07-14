const express = require('express');
const app = express();
const path = require('path');

// If you use ejs then

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname , '/views'))

app.get('/', (req,res) => {
  res.render('index');
})

const port = 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})

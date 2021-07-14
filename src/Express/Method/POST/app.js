const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views/'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.post('/contact', (req, res) => {
    let {email , problem} = req.body
    let data = {
        'email': email,
        'problem': problem
    }

    res.render('send', {data})
})

let port = 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port} `);
})

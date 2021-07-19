const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

const port = 3000;
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render("index")
})

app.post('/', (req,res) =>{
    const {name , age, location} = req.body
    res.cookie('name', name)
    res.cookie('age', age)
    res.cookie('location', location)
    res.redirect("/info")
})

app.get('/info', (req, res)=> {
    res.render("info", {
        name: req.cookies.name,
        age: req.cookies.age,
        location: req.cookies.location,
    })
})

app.listen(port, () => {
    console.log(`Server is working on port ${port}`)
})

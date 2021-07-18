const express = require("express");
const app = express();
const router = require("./routes/index")
const db = require("./config/database")

const port = 3000;

app.use(express.static('public'))

// Select the template engine
app.set('view engine', 'ejs')

app.use('/post', router)
app.get('/', (req, res) => {
    res.render("home")
})

//Creating the server

app.listen(port, () => {
    console.log(`Server is runnning on port ${port}`)
})
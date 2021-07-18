const express = require("express");
const app = express();
const router = require("./routes/manage")
const DB = require("./config/database")

const port = 3000;

app.set('view engine', 'ejs');
app.use('/net', router)

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})
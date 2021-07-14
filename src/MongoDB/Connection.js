const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = 3000;
const DB_URI = "mongodb://localhost:27017/mydb"

mongoose.connect(DB_URI);

mongoose.connection.once('connected', () => {
    console.log("MongoDB connected on " + DB_URI);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

const express = require('express');
const app = express();
const path = require('path');

const port = 3000;
let filePath = '/pages/index.html'

app.get('/', (req, res) => {
    let pathname = path.join(__dirname , filePath);
    res.sendFile(pathname);
})

app.listen(port, () => {
    console.log(`Server is running in ${port}`)
})

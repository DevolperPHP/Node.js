function add(a,b){ // I want to use this function in app.js but this fucntion is privete
    console.log(a+b)
}

module.exports = add ; // with this code I made the "add" function as public so I can use it in any class

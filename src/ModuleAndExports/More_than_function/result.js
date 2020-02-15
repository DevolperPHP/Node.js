/*
This file have more than one function and I need to use all the function with another file
so I will use another type of module and export
*/
function add(a,b){
    console.log(a+b)
}


function squar(s){
    console.log(s*s)
}

module.exports = {
    add : add,
    squar : squar
}

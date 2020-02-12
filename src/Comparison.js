
// NODE JS

var data = {


    "myfunction" : function () {

        console.log(this == data);

    }

}

data.myfunction();

setTimeout(function () {
    process.exit();
}, 500000);

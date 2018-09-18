var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('./'));
var request = require('request');
var util = require('util');


app.get('/', (req,res) =>{

    res.sendFile(path.join(__dirname + '/index.html'))

});

app.use("/Usuarios",(req,res) => {

    let urlJson = "http://localhost:3000/Usuarios";

    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded',


    }

    var options = {
        url : urlJson,
        method : 'GET',
        jar : true,
        headers : headers
    }

    request(options,(error,response,body) =>{

        if (!error && response.statusCode == 200 ){
            console.log(body);
            res.json(JSON.parse(body));
        }
        else{
            console.log(body)

            res.json(JSON.parse(body));

        }

    } )

})






app.listen(3001, () =>{

    console.log("Listening on port 3000");

})

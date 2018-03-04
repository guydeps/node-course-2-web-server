const port = process.env.PORT || 3000;
const express = require('express');
const hbs = require('hbs');
var app = express();

app.set("view engine", 'hbs');

app.use(express.static(__dirname + "/public"));

app.get('/', function (req, res) {
    //res.send("<h1>Hello !</h1>");
    res.send({ name: "Guy", like: ["bike", "roller"] });
});

app.get('/about', (req, res) => {
    //res.send("<h1>Excellent, this is working !!!!</h1>");
    //res.render('about.hbs', {title:"some title", paragraph: "some p", header: "some header"});
    var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
        "{{kids.length}} kids:</p>" +
        "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
    var template = hbs.compile(source);

    var data = {
        name: "Guy",
        hometown:"Lyrgeon",
        kids: [{ "name": "David", "age": "4.5" }, { "name": "Frida", "age": "0" }]
    };
    var result = template(data);
    res.send(result);
});

//bad
app.get('/bad', function (req, res) {
    //res.send({ error: "not working", reason: "some reason" });    
});

app.listen(port, ()=>{
    console.log('Server is up on port '+port);
});
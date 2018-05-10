
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');

var server = app.listen(1337, function() {
    console.log("listening on port 6789");
});
var io = require('socket.io')(server);



app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');




io.on('connection', function (socket) { //2
  
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
    socket.on('thankyou', function (data) { //7
      console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });

    socket.on('form_data', function(data)
    {
        console.log(data);
        var num = Math.floor(Math.random()*1001);
        var dict = 
        {
            "name": data[0].value,
            "location": data[1].value,
            "language": data[2].value,
            "comment": data[3].value,
            "lucky": num
        }
        socket.emit('form_data', dict);
        // socket.emit('lucky_number', {lucky: `Your lucky number emmitted by the server is ${num}`});
    });

  });

app.get('/', function(req, res) 
{
    res.render("index");
})





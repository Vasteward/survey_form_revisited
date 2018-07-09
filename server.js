//A. client initially requests a web page from the server
const express=require('express');
const app=express();
//B. connect to ou server via port 2990
const server=app.listen(3990, function(){
    console.log('listening on port 3990')
});

//allows node to digest the form
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

//F..require the socket.io 
var socket=require('socket.io')
var io = socket(server);

//triggers the "connection listener" to run
io.on('connection', function(socket){
    console.log('made socket connection', socket.id)
    
    //LISTEN for the posting_form msg from the client
    //server-client msg, take in the data that was sent
    //2
    socket.emit('greeting', {msg: "GREETINGS EARTHLING"})   
    socket.on('posting_form', function(data){
        console.log("YOUR SOCKET IS WORKING", data);
        const form_data = data;
        console.log("GET IT", form_data)
        socket.emit('update', form_data);
        console.log("COOOL BEANS", data)

    }); 

    // socket.emit('msg', data)
    // console.log("THis", data)
});


//C. tell the server where to get the templates
// app.set('views', __dirname + '/views');
//D. tell the server which view engine we're using so it'll understand how to compute the embedded jS
// app.set('view engine', 'ejs');

//SESSION___________________________________
//--important to carry the submitted information over to the form
// var session=require('express-session')

// app.use(session({
//     secret: 'kittenmuch',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000}
// }))

//DUH!! Don't forget to render the actual form
// app.get('/', function(req, res){
//     res.render('index')
// })
// app.post('/process', function(req, res){
//     console.log("POST DATA \n", req.body)
//     res.redirect('/')
// })
// app.post('/process', function(req, res){
//     console.log("POST DATA \n\n", req.body)
//     req.session.name=req.body.name
//     req.session.location=req.body.location
//     req.session.comment=req.body.comment
//     req.session.language=req.body.language
//     res.redirect('/results')

// })

// app.get('/results', function(req, res){
//     console.log("session has been logged", req.session)
//     res.render('results',
//     {name: req.session.name, 
//     location: req.session.location, 
//     comment: req.session.comment, 
//     language: req.session.language})
// })

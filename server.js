var express = require('express');
var path = require('path');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3303);
app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
    res.render('home');
});

app.get('/about', function(req,res){
    res.render('about');
});

app.get('/resume', function(req,res){
   res.render('resume');
});

app.get('/contact', function(req,res){
    res.render('contact');
});

app.post("/register/",function(req,res){
    var bodyStr = '';
    req.on("data",function(chunk){
        bodyStr += chunk.toString();
    });
    req.on("end",function(){
        res.send(bodyStr);
    });

});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

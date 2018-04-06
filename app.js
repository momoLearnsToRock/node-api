var express = require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');

var Book=require('./models/bookModel')

var monApp=express();
monApp.use(bodyParser.urlencoded({extended:true}));
monApp.use(bodyParser.json());

var db=mongoose.connect('mongodb://localhost/bookAPI')
.then(
    function(){console.log('connected to mongo successfully');},
    function(err){console.log('failed to connect to mongo');}
);

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error);
  });

  booksRouter=require('./routes/bookRouter')(Book);

monApp.use('/API',booksRouter);

monApp.get(['/get/','/'],function(req,res){
    res.send('momo needs to create more projects!');
});

var port=process.env.port||3000;
monApp.listen(port,function(){
    console.log("gulp must have started listening on port %d", port);
});
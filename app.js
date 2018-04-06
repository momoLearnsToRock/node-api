var express = require('express');
var mongoose=require('mongoose');
var Book=require('./models/bookModel')

var monApp=express();
var db=mongoose.connect('mongodb://localhost/bookAPI')
.then(
    function(){console.log('connected to mongo successfully');},
    function(err){console.log('failed to connect to mongo');}
);

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error);
  });
  
var booksRouter=express.Router(); //looks at the actual objects it is not monApp.Router
booksRouter.route('/Books') 
    .get(function(req,res){
        //res.send('Get a random book');
        var query={}; //this is to avoid filteration on whatever the user inputs in the querystring.
        if(!!req.query.genre){
            query.genre=req.query.genre;
        }

        Book.find(query, function(err,books){
            debugger;
            if(err)
                res.status(500).send(err);
            else
                res.json(books);
        })
    })
    .post(function (req, res) {
        res.send('Add a book');
    })
    .put(function (req, res) {
        res.send('Update a book');
    });
monApp.use('/API',booksRouter);

monApp.get(['/get/','/'],function(req,res){
    res.send('momo needs to create more projects!');
});

var port=process.env.port||3000;
monApp.listen(port,function(){
    console.log("gulp must have started listening on port %d", port);
});
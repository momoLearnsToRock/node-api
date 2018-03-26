var express = require('express');

var monApp=express();

var booksRouter=express.Router(); //looks at the actual objects it is not monApp.Router
booksRouter.route('/Books') 
    .get(function(req,res){
        res.send('Get a random book');
    })
    .post(function (req, res) {
        res.send('Add a book');
    });
monApp.use('/API',booksRouter);

monApp.get(['/get/','/'],function(req,res){
    res.send('momo needs to create more projects!');
});

var port=process.env.port||3000;
monApp.listen(port,function(){
    console.log("gulp must have started listening on port %d", port);
});
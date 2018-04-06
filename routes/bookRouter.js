var express=require('express');
//note that this does not necessarily have to be the books router it could be used for anymodel as the model is being passed as a parameter 
//and because basically all the crud functions are the same for all models.
var routes=function(Book){
    var booksRouter=express.Router(); //looks at the actual objects it is not monApp.Router
    booksRouter.route('/') 
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
            // res.send('Add a book');
            var book= new Book(req.body); // the body parser has already read the json in the body of the request
            book.save();
            console.log(book);
            res.status(201).send(book);//status 201 is for "created"
        })
        .put(function (req, res) {
            res.send('Update a book');
        });

    //this is a middleware used for all the functions chained to routes that have the adress "/:bookId"        
    booksRouter.use('/:bookId',function(req,res,next){
        Book.findById(req.params.bookId, function(err,book){
            if(err)
                res.status(500).send(err);
            else
                req.book=book;
                next();
        });
    });        
    booksRouter.route('/:bookId') 
        .get(function(req,res){
            ////note that the error scenario is handled in the middleware
            //res.send('Get a specific book by id');
            res.json(req.book);
        })
        .put(function(req,res){
            req.book.title=req.body.title;
            req.book.author=req.body.author;
            req.book.genre=req.body.genre;
            req.book.read=req.body.read; 
            req.book.save();                   
            res.json(req.book);
        });
    return booksRouter;
}

module.exports = routes;
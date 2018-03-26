// var gulp = require('gulp'),
// nodemon = require('gulp-nodemon');
var gulp=require('gulp');
gulp.nodemon=require('gulp-nodemon');


gulp.task('default',function(){
    nodemon({
        script:'app.js',
        ext:'js',
        ignore:['./node_modules/**'],
        // env:{
        //     port:8000
        // }
    })
    // .on('restart',function(){
    //     console.log("gulp starting server..");
    // })
})




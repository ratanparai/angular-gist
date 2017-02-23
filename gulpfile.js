var gulp = require('gulp');
var pug = require('gulp-pug');

// file location
var options = {
	angular : {
		src : './node_modules/angular/angular.js',
		srcMin : './node_modules/angular/angular.min.js',
		dest : 'public/js/'
	},
	pug : {
		src : 'src/pug/**/*.pug',
		dest : 'public/'
	}
};

// Gulp task to copy required files to public folder so that we can use them
// on our web app
gulp.task('copy', function(){
    return gulp.src(options.angular.srcMin)
        .pipe(gulp.dest(options.angular.dest));

});


/* pug
 * ----*/
gulp.task('pug', function(){
	return gulp.src(options.pug.src)
		.pipe(pug({
			pretty : true
		}))
		.pipe(gulp.dest(options.pug.dest));

});

/* ------------------------- *
 *          BUILD
 * ------------------------- */
 gulp.task('default', function(callback){
 	runSequence(['copy', 'pug'],
 		callback);
 });


/* ------------------------- *
 *       THE WATCHER
 * ------------------------- */
// Follow this syntax
// gulp.task('watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], function (){

gulp.task('watch', ['copy', 'pug'] ,function(){
	gulp.watch(options.pug.src, ['pug']); // pug
});


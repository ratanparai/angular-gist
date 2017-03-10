var gulp = require('gulp');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');

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
	},
	js : {
		src : 'src/js/**/*.js',
		dest : 'public/js'
	}
};

// Gulp task to copy required files to public folder so that we can use them
// on our web app
gulp.task('angular', function(){
    return gulp.src(options.angular.srcMin)
        .pipe(gulp.dest(options.angular.dest));

});

gulp.task('js', function () {
	return gulp.src(options.js.src)
		.pipe(gulp.dest(options.js.dest));
})

/*
 * copy tasks
 */
gulp.task('copy', ['angular', 'js']);


/* pug
 * ----*/
gulp.task('pug', function(){
	return gulp.src(options.pug.src)
		.pipe(plumber())
		.pipe(pug({
			pretty : true
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest(options.pug.dest));

});

/* ------------------------- *
 *          BUILD
 * ------------------------- */
 gulp.task('default', ['pug', 'copy', 'watch']);


/* ------------------------- *
 *       THE WATCHER
 * ------------------------- */
// Follow this syntax
// gulp.task('watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], function (){

gulp.task('watch', ['copy', 'pug'] ,function(){
	gulp.watch(options.pug.src, ['pug']); // pug
	gulp.watch(options.js.src, ['js']); // js
});


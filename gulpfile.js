var gulp = require('gulp');

// Gulp task to copy required files to public folder so that we can use them
// on our web app
gulp.task('copy', function(){
    gulp.src('./node_modules/angular/angular.min.js')
        .pipe(gulp.dest('./public/js/'));

});

gulp.task('default', ['copy']);

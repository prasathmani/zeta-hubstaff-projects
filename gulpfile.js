var gulp = require('gulp'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');

gulp.task('watch', function () {
    gulp.watch('./assets/less/*.less', ['less']);
});

gulp.task('less', function () {
    gulp.src('./assets/less/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./assets/css/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./assets/css/'))

});

gulp.task('default', ['less', 'watch']);
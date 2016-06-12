'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass-compile', function () {
    gulp.src('./Content/Sass/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./Content/'));
});

gulp.task('watch-sass', function () {
    gulp.watch('./Content/Sass/*.scss', ['sass-compile']);
});
var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var path = require('path');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');

var skipError = false;
var baseDir = '../test-project/backbase';

var lessFiles = path.join(baseDir + '/**/*.less');
var jsxFiles = path.join(baseDir + '/**/*.jsx');

gulp.task('less', function () {
    return gulp.src(lessFiles)
        .pipe(gulpif(skipError, plumber()))
        .pipe(less())
        .pipe(rename(function(pathConf) {
            pathConf.dirname = path.join(pathConf.dirname, '../dist/css');
        }))
        .pipe(gulp.dest(baseDir));
});

gulp.task('jsx', function () {
    return gulp.src(jsxFiles)
        .pipe(gulpif(skipError, plumber()))
        .pipe(babel())
        .pipe(rename(function(pathConf) {
            pathConf.dirname = path.join(pathConf.dirname, '../dist/js');
        }))
        .pipe(gulp.dest(baseDir));
});

gulp.task('watch', function () {
    skipError = true;

    gulp.watch(lessFiles, ['less']);
    gulp.watch(jsxFiles, ['jsx']);
});

gulp.task('default', ['less', 'jsx']);
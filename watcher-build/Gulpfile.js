var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var path = require('path');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var statusControl = require('../status-control');

var skipError = false;
var baseDir = '../test-project/backbase';

var iteration = 0;
var iterationStatus = {};

var lessFiles = path.join(baseDir + '/**/*.less');
var jsxFiles = path.join(baseDir + '/**/*.jsx');

var errorHandler = function(err){
    // Output an error message
    gutil.log(gutil.colors.red('Error (' + err.plugin + '): ' + err.message));

    iterationStatus.status = 'error';
    iterationStatus.msg = err.message;

    // emit the end event, to properly end the task
    this.emit('end');

    if (!skipError) {
        endHandler();
        process.exit();
    }
};

var endHandler = function(){
    console.log('FINITO');

    statusControl.update('build', {
        status: iterationStatus.status,
        msg: iterationStatus.msg
    });
};

gulp.task('pre', function () {
    iterationStatus = {
        status: 'ok'
    };
    iteration++;
});

gulp.task('less', function () {
    return gulp.src(lessFiles)
        .pipe(plumber(errorHandler))
        .pipe(less())
        .pipe(rename(function(pathConf) {
            pathConf.dirname = path.join(pathConf.dirname, '../dist/css');
        }))
        .pipe(gulp.dest(baseDir));
});

gulp.task('jsx', function () {
    return gulp.src(jsxFiles)
        .pipe(plumber(errorHandler))
        .pipe(babel())
        .pipe(rename(function(pathConf) {
            pathConf.dirname = path.join(pathConf.dirname, '../dist/js');
        }))
        .pipe(gulp.dest(baseDir));
});

gulp.task('watch', function () {
    skipError = true;

    gulp.run('default');

    gulp.watch([
        lessFiles,
        jsxFiles
    ], ['default']);
});

gulp.task('default', ['pre', 'less', 'jsx'], endHandler);
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var path = require('path');
var csslint = require('gulp-csslint');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var statusControl = require('../status-control');

var skipError = false;
var baseDir = '../test-project/bundles';

var iteration = 0;
var iterationStatus = {};

var cssFiles = path.join(baseDir + '/**/*.css');
var jsFiles = path.join(baseDir + '/**/*.js');

var endHandler = function(){
    statusControl.update('Lint', {
        status: iterationStatus.status,
        msg: iterationStatus.msg
    });
};

var errorHandler = function(err){
    // Output an error message
    gutil.log(gutil.colors.red('Error (' + err.plugin + '): ' + err.message));

    iterationStatus.status = 'error';
    iterationStatus.msg = err.message;

    // emit the end event, to properly end the task
    if (this.emit) this.emit('end');

    if (!skipError) {
        endHandler();
        process.exit();
    }
};

var customReporter = function(file){
    gutil.log(gutil.colors.cyan(file.csslint.errorCount) + ' errors in ' + gutil.colors.magenta(file.path));

    file.csslint.results.forEach(function (result) {
        gutil.log(result.error.message + ' on line ' + result.error.line);
    });

    errorHandler({
        message: file.csslint.results[0].error.message,
        plugin: 'CSSLint'
    });
};

gulp.task('pre', function () {
    iterationStatus = {
        status: 'ok'
    };
    iteration++;
});

gulp.task('css-lint', function () {
    return gulp.src([
            cssFiles,
            '!' + baseDir + '/**/node_modules/**',
            '!' + baseDir + '/**/bower_components/**'
        ])
        .pipe(plumber(errorHandler))
        .pipe(csslint())
        .pipe(csslint.reporter(customReporter));
});

gulp.task('eslint', function () {
    return gulp.src([
            jsFiles,
            '!' + baseDir + '/**/node_modules/**',
            '!' + baseDir + '/**/bower_components/**'
        ])
        .pipe(plumber(errorHandler))
        .pipe(eslint({
            "globals": {
                "define": true,
                "gadgets": true
            },
            "env": {
                "browser": true
            },
            "rules": {
                "quotes": [0],
                "no-console": [1],
                "no-extra-boolean-cast": [0],
                "no-underscore-dangle": [0],
                "no-alert": [1],
                "semi": [0],
                "curly": [0],
                "eol-last": [0],
                "vars-on-top": [1]
            }
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError());
});

gulp.task('watch', function () {
    skipError = true;

    gulp.run('default');

    gulp.watch([
        cssFiles,
        jsFiles,
        '!' + baseDir + '/**/node_modules/**',
        '!' + baseDir + '/**/bower_components/**/*'
    ], ['default']);
});

gulp.task('default', ['pre', 'css-lint', 'eslint'], endHandler);
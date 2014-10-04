var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    browserify = require('browserify'),
    bower      = require('bower'),
    source     = require('vinyl-source-stream'),
    watch      = require('gulp-watch'),
    connect    = require('gulp-connect'),
    tasks      = require("gulp-load-plugins")(),
    demo       = require('./package.json');

/*
|--------------------------------------------------------------------------
| Demo name / Read package.json
|--------------------------------------------------------------------------
|
|
*/


var demoName = demo.name;


/*
|--------------------------------------------------------------------------
| Bower tasks
|--------------------------------------------------------------------------
|
|
*/


gulp.task('bower', function() {
    var bowerJSON = require('./bower.json');
});


/*
|--------------------------------------------------------------------------
| Concat bootstrap
|--------------------------------------------------------------------------
|
|
*/


gulp.task('concat-bootstrap', function() {
  gulp.src([
    './bower_components/bootstrap-sass/js/dropdown.js',
    './bower_components/bootstrap-sass/js/collapse.js',
    './bower_components/bootstrap-sass/js/affix.js',
    './bower_components/bootstrap-sass/js/transition.js' ])
    .pipe(tasks.concat('all.js'))
    .pipe(gulp.dest('./client/requires/bootstrap/js/'))
});



/*
|--------------------------------------------------------------------------
| Browserify tasks
|--------------------------------------------------------------------------
|
|
*/


gulp.task('browserify', function() {
    return gulp.src('./client/src/main.js')
        .pipe(tasks.browserify({
            transform: ['hbsfy', 'browserify-shim']
        }))
        //.pipe(tasks.uglify())
        .pipe(tasks.concat(demoName + '.js'))
        .pipe(gulp.dest('./public/js/'));
});


/*
|--------------------------------------------------------------------------
| Sass tasks
|--------------------------------------------------------------------------
|
|
*/


gulp.task('sass', function () {
    return gulp.src([
        'client/styles/sass/bootstrap.scss', 
        'client/styles/sass/main.scss' ])
        .pipe(tasks.sass())
        .pipe(tasks.autoprefixer())
        .pipe(tasks.concat(demoName + '.css'))
        .pipe(gulp.dest('./public/css'));
});


/*
|--------------------------------------------------------------------------
| Live updates
|--------------------------------------------------------------------------
|
|
*/


gulp.task('connect', connect.server({
    root: ['public'],
    port: 8300,
    open: { browser: "firefox" },
    livereload: true
}));


/*
|--------------------------------------------------------------------------
| Gulp watch these files
|--------------------------------------------------------------------------
|
|
*/


gulp.task('watch', function() {
    gulp.watch('client/src/**/*.js', ['browserify', 'concat-bootstrap']);
    gulp.watch('client/templates/*.hbs', ['browserify']);
    gulp.watch('client/styles/sass/**/*.scss', ['sass']);
});


/*
|--------------------------------------------------------------------------
| Default 
|--------------------------------------------------------------------------
|
|
*/


gulp.task('default', ['browserify', 'sass', 'watch']);

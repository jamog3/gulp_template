var gulp = require('gulp');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');

var config  = require('../config');
var ErrorHandler  = require('../utils/errorHandler');

// javascripts
var uglify = require('gulp-uglify');


// browserifyしないjavascriptをminifyしてコピー
gulp.task('jsMin', function(){
  gulp.src(config.src.js + 'libs/*')
    .pipe(plumber({
      errorHandler: ErrorHandler
    }))
    .pipe(uglify({preserveComments:'some'})) // minify＆ライセンスコメント残す
    .pipe(gulp.dest(config.dist.js + 'libs/'))
    .pipe(browserSync.reload({stream: true}));
});
var gulp = require('gulp');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');

var config  = require('../config');

// javascripts
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');


gulp.task('js', function(){
  // エラーメッセージ
  var errorMsg = function() {
    var args = Array.prototype.slice.call(arguments);
    // Send error to notification center with gulp-notify
    notify.onError({
      title: "Compile Error",
      message: "<%= error %>"
    }).apply(this, args);
    // Keep gulp from hanging on this task
    this.emit('end');
  };
  browserify({
    entries: [ config.src.js + 'common.js']
  }).bundle()
  .on('error', errorMsg)
  .pipe(plumber())
  .pipe(source('common.js'))
  .pipe(buffer())
  // .pipe(jshint())
  .pipe(uglify({preserveComments:'some'})) // minify＆ライセンスコメント残す
  .pipe(gulp.dest(config.dist.js))
  .pipe(browserSync.reload({stream: true}));
});

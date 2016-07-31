var gulp = require('gulp');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');

var config  = require('../config');

// javascripts
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var named = require('vinyl-named');


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

  gulp.src( config.src.js + '*.js')
    .pipe(named())
    .pipe(webpack({
      devtool: "#inline-source-map",
    module: {
      loaders: [
        {
          test: /.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015'],
            plugins: ['mjsx']
          }
        }
      ]
    }
    }))
    .on('error', errorMsg)
    .pipe(plumber())
    .pipe(buffer())
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('./dist/assets/javascripts/'))
    .on('end', function() {
      return browserSync.reload();
    });
});

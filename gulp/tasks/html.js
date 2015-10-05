var gulp = require('gulp');
var gulpif  = require('gulp-if');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');
var cached = require('gulp-cached');

var config  = require('../config');

// html
var ejs = require("gulp-ejs");

// コンパイル
gulp.task('html', ['html_main'], function(){
  // browserSync と ejsの相性が悪いので分離
  browserSync.reload();
});

gulp.task('html_main', function(callback){
  // ルートパス取得用
  var rootPath = config.root + config.src.root;

  gulp.src([
    config.src.html + '**/*.ejs',
    '!' + config.src.html + '_partial/**/*'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    // 変更されたファイルのみコンパイル。ejs全体の時は使わない
    .pipe(gulpif( !config.isEjsAllFlag , cached('ejs') ))
    .pipe(ejs({
      'rootPath': rootPath
      }))
    .pipe(gulp.dest(config.dist.html))
    .on('end', function() {
      // callbackを実行してgulpにタスク完了を通知
      callback();
    });
    //.pipe(browserSync.reload({stream: true}));
});

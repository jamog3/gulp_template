var gulp = require('gulp');
var gulpif  = require('gulp-if');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');
var cached = require('gulp-cached');
var reload = browserSync.reload;

var config  = require('../config');

// html
var pug = require("gulp-pug");

gulp.task('html', function() {
  var rootPath = config.root + config.src.root;
  gulp.src([
    config.src.html + '**/*.pug',
    '!' + config.src.html + '_template/**/*'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    // 変更されたファイルのみコンパイル。ejs全体の時は使わない
    .pipe(gulpif( !config.isHtmlAllFlag , cached('pug') ))
    .pipe(pug({
      // 出力ファイルが整形される
      pretty: true,
      // includeなどをルートパスで書けるようにする
      basedir: rootPath,
      // jadeに変数を渡す場合
      locals: {
        'rootPath': rootPath
      }
    }))
    .pipe(gulp.dest(config.dist.html))
    .on('end', reload);
});

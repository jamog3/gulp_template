var gulp = require('gulp');
var gulpif  = require('gulp-if');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');
var changed = require('gulp-changed');
var cached = require('gulp-cached');
var reload = browserSync.reload;

var config  = require('../config');

// html
var pug = require("gulp-pug");
var pugInheritance = require("gulp-pug-inheritance");

gulp.task('html', function() {
  var rootPath = config.root + config.src.root;
  gulp.src(config.src.html + '**/*.pug')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    // 変更されたファイルのみコンパイル。ejs全体の時は使わない
    .pipe(changed(config.dist.root, {
      extension: ".html"
    }))
    // .pipe(gulpif( !config.isHtmlAllFlag , cached('pug') ))
    .pipe(gulpif(global.isWatching, cached("pug"))).pipe(pugInheritance({
      basedir: config.src.root,
      skip: ["node_modules", "some_other_folder"]
    }))
    .pipe(pug({
      // 出力ファイルが整形される
      pretty: true,
      // includeなどをルートパスで書けるようにする
      basedir: rootPath,
      // pugに変数を渡す
      locals: {
        'rootPath': rootPath
      }
    }))
    .pipe(gulp.dest(config.dist.html))
    .on('end', reload);
});

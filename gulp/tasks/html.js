var gulp = require('gulp');
var gulpif  = require('gulp-if');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');
var changed = require('gulp-changed');
var cached = require('gulp-cached');
var reload = browserSync.reload;

var htmlValidator = require('gulp-html-validator');
var intercept = require('gulp-intercept');

var config  = require('../config');

// html
var pug = require("gulp-pug");
var pugInheritance = require("gulp-pug-inheritance");

gulp.task('html', function() {
  var rootPath = config.root + config.src.html;
  gulp.src([
      config.src.html + '**/*.pug',
      '!' + config.src.html + '_*/**/*',
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    // 変更されたファイルのみコンパイル。
    .pipe(changed(config.dist.html, {
      extension: ".html"
    }))
    .pipe(gulpif(global.isWatching, cached("pug")))
    // .pipe(pugInheritance({
    //   basedir: config.src.html,
    // }))
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

gulp.task('html_noCache', function() {
  var rootPath = config.root + config.src.html;
  gulp.src([
      config.src.html + '**/*.pug',
      '!' + config.src.html + '_*/**/*',
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
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

// html validator
gulp.task('html_validator', function() {
  gulp.src(config.dist.html + '**/*.html')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(cached("htmlv"))
    .pipe(htmlValidator({
      format: 'json'
    }))
    .pipe(intercept(function(file) {
      var errors, json;
      json = JSON.parse(file.contents.toString());
      errors = json.messages.filter(function(e, i, a) {
        return e.type !== 'info';
      });
      if (errors.length !== 0) {
        console.log('\u001b[31m\nHTML VALIDATOR ERROR!!');
        console.log(errors);
        return console.log('\u001b[0m\n');
      }
    }));

});


var gulp = require('gulp');
var gulpif  = require('gulp-if');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var cached = require('gulp-cached');
var reload = browserSync.reload;

var config  = require('../config');
var ErrorHandler  = require('../utils/errorHandler');
var ErrorHandlerLinter  = require('../utils/errorHandlerLinter');

// html
var pug = require("gulp-pug");
var pugLinter = require('gulp-pug-linter');
var pugInheritance = require("gulp-pug-inheritance");

// html validator
var w3cjs = require('gulp-w3cjs');
var notifier = require('node-notifier');

gulp.task('html', function() {
  var rootPath = config.root + config.src.html;
  var myReporter = function (errors) {
    if (errors.length) { console.log(errors); }
  };
  gulp.src([
      config.src.html + '**/*.pug',
      '!' + config.src.html + '_*/**/*',
    ])
    .pipe(plumber({
      errorHandler: ErrorHandler
    }))
    // 変更されたファイルのみコンパイル。
    .pipe(changed(config.dist.html, {
      extension: '.html'
    }))
    .pipe(gulpif(global.isWatching, cached("pug")))
    // .pipe(pugInheritance({
    //   basedir: config.src.html,
    // }))
    .pipe(pugLinter({
      'extends': '.pug-lintrc',
    }))
    .pipe(pugLinter.reporter(ErrorHandlerLinter))
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

    // html validator
    .pipe(w3cjs({
      verifyMessage: function(type, message) {
        notifier.notify({
          message: message,
          title: 'HTML VALIDATE ERROR!!',
          sound: 'Glass'
        });
        // prevent logging error message
        if(message.indexOf('Element “style” not allowed as child of element') === 0) return false;
        // allow message to pass through
        return true;
      }
    }))

    .on('end', reload);
});

gulp.task('html_all', function() {
  var rootPath = config.root + config.src.html;
  gulp.src([
      config.src.html + '**/*.pug',
      '!' + config.src.html + '_*/**/*',
    ])
    .pipe(plumber({
      errorHandler: ErrorHandler
    }))
    .pipe(pugLinter({
      'extends': '.pug-lintrc',
    }))
    .pipe(pugLinter.reporter(ErrorHandlerLinter))
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
    .pipe(w3cjs({
      verifyMessage: function(type, message) {
        notifier.notify({
          message: message,
          title: 'HTML VALIDATE ERROR!!',
          sound: 'Glass'
        });
        // prevent logging error message
        if(message.indexOf('Element “style” not allowed as child of element') === 0) return false;
        // allow message to pass through
        return true;
      }
    }))
    .pipe(gulp.dest(config.dist.html))
    .on('end', reload);
});

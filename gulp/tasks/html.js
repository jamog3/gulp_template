var gulp = require('gulp');
var gulpif  = require('gulp-if');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var cached = require('gulp-cached');
var reload = browserSync.reload;

var config  = require('../config');
var ErrorHandler  = require('../utils/errorHandler');

// html
var pug = require("gulp-pug");
var puglint = require("gulp-pug-lint");
var pugInheritance = require("gulp-pug-inheritance");

// html validator
var htmlValidator = require('gulp-html-validator');
var intercept = require('gulp-intercept');
var notifier = require('node-notifier');
var filenames = require('gulp-filenames');

gulp.task('html', function() {
  var rootPath = config.root + config.src.html;
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
    .pipe(puglint({
      'extends': '.pug-lintrc',
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

    // html validator
    .pipe(filenames('html', {overrideMode: true}))
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
        // 通知
        notifier.notify({
          message: filenames.get(['html'], ['full']) + 'にエラーが'+ errors.length +'件あります',
          title: 'HTML VALIDATE ERROR!!',
          sound: 'Glass'
        });
        console.log('\u001b[31m\nHTML VALIDATE ERROR!! (count: '+ errors.length +')\n');
        for (var j = 0; j < errors.length; j++) {
          console.log('file   : ' + filenames.get(['html'], ['full']));
          console.log('line   : ' + errors[j].lastLine);
          console.log('message: ' + errors[j].message);
          console.log(errors[j].extract+ '\n');
        }
        // console.log(errors);
        return console.log('\u001b[0m');
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
    .pipe(puglint({
      'extends': '.pug-lintrc',
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

var gulp = require('gulp');
var gulpif  = require('gulp-if');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');

var config  = require('../config');

// stylesheets
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var combineMq = require('gulp-combine-mq');

// sassコンパイル
gulp.task('css', function(){
  gulp.src(config.src.css + '**/*.sass')
    // エラーメッセージ通知
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    // Build時はなし
    .pipe(gulpif( !config.isBuildFlag , sourcemaps.init()))
    .pipe(gulpif( !config.isBuildFlag ,
      sass({
        // mapの行数がズレるため、compressedにしない
        outputStyle: 'expanded' // nested/expanded/compact/compressed の4種類から選択
      }) ,
      // Buildのとき
      sass({
        outputStyle: 'compressed'
      })
    ))
    // Build時のみ、メディアクエリをまとめる
    .pipe(gulpif( config.isBuildFlag ,
      combineMq({
        beautify: false
      })
    ))
    // ベンダープレフィックス追加
    .pipe(autoprefixer ({
      browsers: [
        'last 2 versions' ,
        'ie 9' ,
        'ios 6' ,
        'android 4'
      ],
      cascade: false
    }))
    // Build時はなし。soucemapを生成。
    .pipe(gulpif( !config.isBuildFlag , sourcemaps.write('.')))
    .pipe(gulp.dest(config.dist.css))
    .pipe(browserSync.reload({stream: true}));
});

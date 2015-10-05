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
  gulp.src(config.src.css + '**/*.scss')
    // エラーメッセージ通知
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    // release時はなし
    .pipe(gulpif( !config.isReleaseFlag , sourcemaps.init()))
    .pipe(gulpif( !config.isReleaseFlag ,
      sass({
        // mapの行数がズレるため、compressedにしない
        outputStyle: 'expanded' // nested/expanded/compact/compressed の4種類から選択
      }) ,
      // releaseのとき
      sass({
        outputStyle: 'compressed'
      })
    ))
    // release時のみ、メディアクエリをまとめる
    .pipe(gulpif( config.isReleaseFlag ,
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
    // release時はなし。soucemapを生成。
    .pipe(gulpif( !config.isReleaseFlag , sourcemaps.write('.')))
    .pipe(gulp.dest(config.dist.css))
    .pipe(browserSync.reload({stream: true}));
});

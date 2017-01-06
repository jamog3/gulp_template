var gulp = require('gulp');
var gulpif  = require('gulp-if');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');

var config  = require('../config');
var ErrorHandler  = require('../utils/errorHandler');

// stylesheets
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// PostCSS
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require("css-mqpacker");

// sassコンパイル
gulp.task('css', function(){
  gulp.src(config.src.css + '**/*.sass')
    // エラーメッセージ通知
    .pipe(plumber({
      errorHandler: ErrorHandler
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
    // PostCSS
    .pipe(postcss([
      // ベンダープレフィックス追加
      autoprefixer({
        browsers: [
          'last 4 versions' ,
          'ie 9' ,
          'ios 7' ,
          'android 4'
        ],
        cascade: false
      }),
      // メディアクエリをまとめる
      mqpacker({
        sort: true
      })
    ] ))
    .pipe(gulpif( !config.isBuildFlag , sourcemaps.write('.')))
    .pipe(gulp.dest(config.dist.css))
    .pipe(browserSync.reload({stream: true}));
});

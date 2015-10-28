var gulp = require('gulp');
var cached = require('gulp-cached');
var changed  = require('gulp-changed');

var config  = require('../config');

// img min
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// 画像圧縮
gulp.task( 'imgMin', function(){
  gulp.src([
    config.src.img + '**/*.+(jpg|jpeg|gif|svg)' ,
    // spritesの素材を除外
    '!' + config.src.img + '_sprites/**/*'
    ])
    .pipe(changed( config.dist.img ))
    .pipe(imagemin( {
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    } ))
    .pipe(gulp.dest( config.dist.img ));
});

gulp.task( 'imgMinPng', function(){
  gulp.src([
    config.src.img + '**/*.png' ,
    // spritesの素材を除外
    '!' + config.src.img + '_sprites/**/*'
    ])
    .pipe(changed( config.dist.img ))
    .pipe(imagemin({
      use: [
        // pngquantを使用
        // 色が変わるようなら100固定にする
        pngquant({
          quality: 80 - 100,
          speed: 1
        })
      ]
    }))
    .pipe(gulp.dest( config.dist.img ));
});

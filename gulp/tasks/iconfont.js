var gulp        = require('gulp');
var config      = require('../config');
var iconfont    = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
// var fontName    = 'iconfont'; // シンボルフォント名

gulp.task('iconfont', function(){
  gulp.src([ config.src.root + 'iconfonts/_icons/*.svg' ])
    .pipe(iconfont({
      fontName: 'iconfont',
      fixedWidth: true,
      startCodepoint: 0xF001
    }))

    .on('glyphs', function(glyphs, options) {
      gulp.src( config.src.root + 'iconfonts/_templates/_iconfont.scss' )
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: 'iconfont',
          fontPath: '../fonts/',
          className: 'iconfont'
        }))
        .pipe(gulp.dest( config.src.css + '_partial/' ));
    })

  .pipe(gulp.dest( config.src.copy + 'fonts/' ));
});








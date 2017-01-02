var gulp = require('gulp');

var config  = require('../config');

// watch
gulp.task('watch', function(){

  // html
  gulp.watch([
    config.src.html + '**/*.pug',
    '!' + config.src.html + '_*/**/*.pug'
  ], function() {
    gulp.start('html');
  });

  // html_all
  gulp.watch(config.src.html + '_*/**/*.pug', function() {
    gulp.start('html_noCache');
  });

  // css
  gulp.watch(config.src.css + '**/*.sass', ['css']);

  // img
  gulp.watch(config.src.img+'**/*.png', function() {
    gulp.start('imgMinPng');
  });

  // ファイルが追加された時にも実行
  gulp.watch(config.src.img+'**/*.+(jpg|jpeg|gif|svg)', function() {
    gulp.start('imgMin');
  });

  // js
  gulp.watch(config.src.js+'**/*', ['js']);
  // gulp.watch( setPath.distDir + '**/*' , reload);
});


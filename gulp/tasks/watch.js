var gulp = require('gulp');

var config  = require('../config');

// watch
gulp.task('watch', function(){

  // html
  gulp.watch([
    config.src.html + '**/*.ejs',
    '!' + config.src.html + '_partial/**/*.ejs'
  ], function() {
    // ejs個別
    config.isEjsAllFlag = false;
    gulp.start('html');
  });

  gulp.watch(config.src.html + '_partial/**/*.ejs', function() {
    // ejs全体
    config.isEjsAllFlag = true;
    gulp.start('html');
  });

  // css
  gulp.watch(config.src.css + '**/*.scss', ['css']);

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


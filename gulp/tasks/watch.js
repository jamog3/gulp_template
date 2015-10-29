var gulp = require('gulp');

var config  = require('../config');

// watch
gulp.task('watch', function(){

  // html
  gulp.watch([
    config.src.html + '**/*.jade',
    '!' + config.src.html + '_partial/**/*'
  ], function() {
    // ejs個別
    config.isHtmlAllFlag = false;
    gulp.start('html');
  });

  gulp.watch(config.src.html + '_partial/**/*.jade', function() {
    // ejs全体
    config.isHtmlAllFlag = true;
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


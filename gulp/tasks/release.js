var gulp = require('gulp');
var del = require('del');

var config  = require('../config');

// リリース時はこれを叩く
gulp.task('release', ['release_main'], function() {
  del('release'); // releaseディレクトリを削除後に生成開始
});

gulp.task('release_main', function(callback){
  config.isReleaseFlag = true;
  // pathの上書き
  config.dist.root = config.release.root;
  config.dist.html = config.release.html;
  config.dist.img = config.release.img;
  config.dist.css = config.release.css;
  config.dist.js = config.release.js;
  gulp.start([
    'html',
    'css',
    'imgMin',
    'imgMinPng',
    'js',
    'jsCopy'
    ]).on('end', function() {
      // callbackを実行してgulpにタスク完了を通知
      callback();
    });
});


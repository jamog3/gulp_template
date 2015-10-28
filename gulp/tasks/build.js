var gulp = require('gulp');
var del = require('del');

var config  = require('../config');

// リリース時はこれを叩く
gulp.task('build', ['build_main'], function() {
  del('build'); // buildディレクトリを削除後に生成開始
});

gulp.task('build_main', function(callback){
  config.isBuildFlag = true;
  // pathの上書き
  config.dist.root = config.build.root;
  config.dist.html = config.build.html;
  config.dist.img = config.build.img;
  config.dist.css = config.build.css;
  config.dist.js = config.build.js;
  gulp.start([
    'copy',
    'html',
    'css',
    'imgMin',
    'imgMinPng',
    'js',
    'jsMin'
    ]).on('end', function() {
      // callbackを実行してgulpにタスク完了を通知
      callback();
    });
});


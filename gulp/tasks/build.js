var gulp = require('gulp');
var del = require('del');

var config  = require('../config');

// リリース用ディレクトリを削除
gulp.task('del_build', function() {
  del(config.build.root + '**');
});

// リリース時はこれを叩く
gulp.task('build', function(){
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
    ]);
});


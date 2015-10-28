var gulp = require('gulp');

// default
gulp.task('default', [
  'server',
  'copy',
  'html',
  'css',
  'sprite',
  'imgMin',
  'imgMinPng',
  'js',
  'jsMin',
  'watch'
]);


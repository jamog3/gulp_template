var gulp = require('gulp');

// default
gulp.task('default', [
  'copy',
  'html_all',
  'css',
  'imgMin',
  'imgMinPng',
  'js',
  'jsMin',
  'watch',
  'server'
]);


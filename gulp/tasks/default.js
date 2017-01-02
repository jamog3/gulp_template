var gulp = require('gulp');

// default
gulp.task('default', [
  'copy',
  'html_noCache',
  'css',
  'imgMin',
  'imgMinPng',
  'js',
  'jsMin',
  'watch',
  'server'
]);


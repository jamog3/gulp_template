var gulp = require('gulp');

// default
gulp.task('default', [
  'copy',
  'html',
  'css',
  'imgMin',
  'imgMinPng',
  'js',
  'jsMin',
]);


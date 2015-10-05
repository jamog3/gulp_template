var gulp = require('gulp');

// default
gulp.task('default', [
  'server',
  'html',
  'css',
  'imgMin',
  'imgMinPng',
  'js',
  'jsCopy',
  'watch'
]);


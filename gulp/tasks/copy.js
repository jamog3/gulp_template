var gulp = require('gulp');

var config  = require('../config');

gulp.task( 'copy', function() {
  console.log(config.copy);
  return gulp.src(
    config.copy,
    { base: config.src.root }
  )
  .pipe( gulp.dest( config.dist.root ) );
});

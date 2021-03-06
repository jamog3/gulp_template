var gulp = require('gulp');
var gulpif  = require('gulp-if');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');

var config  = require('../config');
var ErrorHandler  = require('../utils/errorHandler');

// javascripts
var webpack = require('webpack-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var named = require('vinyl-named');
var notifier = require('node-notifier');

gulp.task('js', function(){
  gulp.src( config.src.js + '*.js')
    .pipe(plumber({
      errorHandler: ErrorHandler
    }))
    .pipe(named())
    .pipe(webpack({
      devtool: '#inline-source-map',
      module: {
        preLoaders: [
          {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: "eslint-loader"
          }
        ],
        loaders: [
          {
            test: /.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['es2015'],
              plugins: ['mjsx']
            }
          }
        ]
      },
      eslint: {
        configFile: './.eslintrc'
      }
    }))
    .pipe(buffer())
    .pipe(gulpif( config.isBuildFlag, uglify({preserveComments: 'some'})))
    .pipe(gulp.dest(config.dist.js))
    .on('end', function() {
      return browserSync.reload();
    });
});

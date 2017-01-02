var src   = 'src/';   // 元ファイル
var dist  = '.temp/'; // コンパイル先
var build = 'build/'; // リリース時

// root path
var root = require( 'path' ).join( __dirname, '../' );

module.exports = {
  // root
  'root' : root,

  // flag処理
  'isBuildFlag' : false,

  'src': {
    'root' : src,
    'html' : src + 'html/',
    'css'  : src + 'stylesheets/',
    'img'  : src + 'images/',
    'js'   : src + 'javascripts/'
  },

  'dist': {
    'root' : dist,
    'html' : dist,
    'css'  : dist + 'stylesheets/',
    'img'  : dist + 'images/',
    'js'   : dist + 'javascripts/'
  },

  'build': {
    'root' : build,
    'html' : build,
    'css'  : build + 'stylesheets/',
    'img'  : build + 'images/',
    'js'   : build + 'javascripts/'
  },

  // copyするファイル
  'copy': [
    '**/*.ico',
    'fonts/*.*'
  ],

  // jshintの対象ファイル
   lintfiles:[
      // jsSrc + '/*.js'
  ]
};
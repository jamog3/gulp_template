var src     = 'src/';      // 元ファイル
var dist    = 'dist/';     // コンパイル先
var release = 'release/';  // リリース時

// root path
var root = require( 'path' ).join( __dirname, '../' );

module.exports = {

    // root
    'root' : root,

    // flag処理
    'isReleaseFlag' : false,
    'isEjsAllFlag'  : true,


    'src': {
      'root' : src,
      'html' : src,
      'copy' : src + 'copy/',
      'css'  : src + 'stylesheets/',
      'img'  : src + 'images/',
      'js'   : src + 'javascripts/'
    },

    'dist': {
      'root' : dist,
      'html' : dist,
      'copy' : dist,
      'css'  : dist + 'stylesheets/',
      'img'  : dist + 'images/',
      'js'   : dist + 'javascripts/'
    },

    'release': {
      'root' : release,
      'html' : release,
      'copy' : release,
      'css'  : release + 'stylesheets/',
      'img'  : release + 'images/',
      'js'   : release + 'javascripts/'
    },

    // jshintの対象ファイル
     lintfiles:[
        // jsSrc + '/*.js'
    ]
};
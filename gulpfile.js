var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
// var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');
var cached = require('gulp-cached');
var changed  = require('gulp-changed');
var gulpif  = require('gulp-if');

// html
var ejs = require("gulp-ejs");

// stylesheets
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

// images
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var spritesmith = require('gulp.spritesmith');

// javascripts
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

// path指定
var setPath = {
  srcDir : 'src/',
  srcImage : 'src/images/',
  srcCss : 'src/stylesheets/',
  srcScript : 'src/javascripts/',
  distDir : 'dist/',
  distImage : 'dist/images/',
  distCss : 'dist/stylesheets/',
  distScript : 'dist/javascripts/',
  releaseDir : 'release/',
  releaseImage : 'release/images/',
  releaseCss : 'release/stylesheets/',
  releaseScript : 'release/javascripts/'
}

// flagのデフォルト
var releaseFlag = false;
var ejsAllFlag = false;

// ejs
gulp.task('ejs', function(){
  // ルートパス取得用
  var rootPath = __dirname+'/'+setPath.srcDir;
  gulp.src([
    setPath.srcDir+'**/*.ejs',
    '!'+setPath.srcDir+'_partial/**/*'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    // 変更されたファイルのみコンパイル
    .pipe(cached('ejs'))
    .pipe(ejs({
      'rootPath': rootPath
      }))
    .pipe(gulp.dest(setPath.distDir))
    .pipe(browserSync.reload({stream: true}));
});
// ejs _partialの場合、全体をコンパイルのフラグを立てる
gulp.task('ejsAll', function(){
  // ルートパス取得用
  var rootPath = __dirname+'/'+setPath.srcDir;
  gulp.src([
    setPath.srcDir+'**/*.ejs',
    '!'+setPath.srcDir+'_partial/**/*'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(ejs({
      'rootPath': rootPath
      }))
    .pipe(gulp.dest(setPath.distDir))
    .pipe(browserSync.reload({stream: true}));
});

// sassコンパイル
gulp.task('sass', function(){
  gulp.src( setPath.srcCss + '**/*.scss')
    // エラーメッセージ通知
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sourcemaps.init())
    .pipe(gulpif( releaseFlag == false ,
      // releaseじゃない
      sass({
        outputStyle: 'expanded' // nested/expanded/compact/compressed の4種類から選択
      }) ,
      // releaseのとき
      sass({
        outputStyle: 'compressed'
      })
    ))
    // ベンダープレフィックス追加
    .pipe(autoprefixer ({
      browsers: [
        'last 2 versions',
        'ie 9', 'ios 6',
        'android 4'
      ],
      cascade: false
    }))
    // release時はなし
    .pipe(gulpif( releaseFlag == false , sourcemaps.write('.')))
    .pipe(gulp.dest(setPath.distCss))
    .pipe(browserSync.reload({stream: true}));
});

// スプライト画像を作成
gulp.task('sprite', function(){
  // スプライトにする愉快な画像達
  var spriteData = gulp.src(setPath.srcImage+'sprites/*.png').pipe(spritesmith({
    imgName: 'sprites.png', // スプライトの画像
    cssName: '_sprites.scss', // 生成されるscss
    imgPath: '../images/sprites.png', // 生成されるscssに記載されるパス
    cssFormat: 'scss', // フォーマット
    padding: 10,
    algorithm: 'binary-tree',
    // cssVarMap: function (sprite) {
    // sprite.name;
      // sprite.name = 'sprite-' + sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
    // }
  }));
  spriteData.img.pipe(gulp.dest(setPath.srcImage)); // imgNameで指定したスプライト画像の保存先
  spriteData.css.pipe(gulp.dest(setPath.srcCss+'_partial/')); // cssNameで指定したcssの保存先
});

// 画像圧縮
gulp.task( 'imagemin', function(){
  gulp.src([
    setPath.srcImage + '**/*.+(jpg|jpeg|gif|svg)' ,
    // spritesの素材を除外
    '!' + setPath.srcImage + 'sprites/**/*'
    ])
    .pipe(changed( setPath.distImage ))
    .pipe(imagemin( {
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    } ))
    .pipe(gulp.dest(setPath.distImage));
});
gulp.task( 'imageminPng', function(){
  gulp.src([
    setPath.srcImage + '**/*.png' ,
    // spritesの素材を除外
    '!'+setPath.srcImage+'sprites/**/*'
    ])
    .pipe(changed(setPath.distImage))
    .pipe(imagemin({
      use: [
        // pngquantを使用
        pngquant({
          quality: 60 - 80,
          speed: 1
        })
      ]
    }))
    .pipe(gulp.dest( setPath.distImage ));
});

// javascripts
gulp.task('browserify', function(){
  // エラーメッセージ
  var errorMsg = function() {
    var args = Array.prototype.slice.call(arguments);
    // Send error to notification center with gulp-notify
    notify.onError({
      title: "Compile Error",
      message: "<%= error %>"
    }).apply(this, args);
    // Keep gulp from hanging on this task
    this.emit('end');
  };
  browserify({
    entries: [setPath.srcScript+'main.js']
  }).bundle()
  .on('error', errorMsg)
  .pipe(plumber())
  .pipe(source('bundle.js'))
  .pipe(buffer())
  // .pipe(jshint())
  .pipe(uglify({preserveComments:'some'})) // minify＆ライセンスコメント残す
  .pipe(gulp.dest( setPath.distScript ))
  .pipe(browserSync.reload({stream: true}));
});


// ローカルサーバとか
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: setPath.distDir
    }
  });
});

// リリース時はこれを叩く
gulp.task('release', function(){
  releaseFlag = true;
  setPath.distDir = setPath.releaseDir;
  setPath.distImage = setPath.releaseImage;
  setPath.distCss = setPath.releaseCss;
  setPath.distScript = setPath.releaseScript;
  console.log(setPath.releaseCss);
  gulp.start('sass');
});


// watch
gulp.task('watch', function(){
  gulp.watch([setPath.srcDir+'**/*.ejs', '!'+setPath.srcDir+'_partial/**/*.ejs'], ['ejs']);
  gulp.watch(setPath.srcDir+'_partial/**/*.ejs', ['ejsAll']);
  gulp.watch(setPath.srcCss+'**/*.scss', ['sass']);
  // ファイルが追加された時にも実行
  watch(setPath.srcImage+'**/*.+(jpg|jpeg|gif|svg)', function() {
    gulp.start('imagemin');
  });
  watch(setPath.srcImage+'**/*.png', function() {
    gulp.start('imageminPng');
  });
  gulp.watch(setPath.srcScript+'**/*', ['browserify']);
  // gulp.watch( setPath.distDir + '**/*' , reload);
});

// default
gulp.task('default', ['browserSync', 'ejsAll', 'sass', 'imagemin','imageminPng', 'browserify', 'watch']);

var gulp = require('gulp');

var config  = require('../config');

// sprite
var spritesmith = require('gulp.spritesmith');

// スプライト画像を作成
gulp.task('sprite', function(){
  // スプライトにする愉快な画像達
  var spriteData = gulp.src(config.src.img + '_sprites/*.png').pipe(spritesmith({
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
  spriteData.img.pipe(gulp.dest(config.src.img)); // imgNameで指定したスプライト画像の保存先
  spriteData.css.pipe(gulp.dest(config.src.css + '_partial/')); // cssNameで指定したcssの保存先
});

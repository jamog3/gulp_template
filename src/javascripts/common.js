var $ = require('jquery');
window.$ = $;
window.jQuery = $;
/*
var hoge = require('./browserify_libs/hoge.js');
jQueryプラグインを追加する書き方
*/

$(function(){
  $("a[href^=#]").on('click', function(e){
    e.preventDefault();

    var href = $(this).attr("href");
    var speed = 500;
    var easing = 'swing';
    var target = $(href == "#" || href == "" ? 'html' : href);
    var animateParam = {
        scrollTop: target.offset().top
    }

    $("html, body").animate(animateParam, speed, easing);
  });
});



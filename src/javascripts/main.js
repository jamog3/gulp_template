var $ = require('jquery');

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



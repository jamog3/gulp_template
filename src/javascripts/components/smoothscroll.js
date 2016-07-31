const $ = require('jquery');

export default class smoothscroll {
  constructor() {
    const $anchorLink = $('a[href^="#"]');

    $anchorLink.on('click', function(e){
      e.preventDefault();

      const href = $(this).attr('href');
      const speed = 240;
      const easing = 'swing';
      const target = $(href === '#' || href === '' ? 'html' : href);
      const animateParam = {
          scrollTop: target.offset().top
      };
      $('html, body').animate(animateParam, speed, easing);
    });
  }
}

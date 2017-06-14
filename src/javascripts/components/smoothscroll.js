const $ = require('jquery');

export default class smoothscroll {
  constructor() {
    const $anchorLink = $('a[href^="#"]');

    $anchorLink.on('click', (e) => {
      e.preventDefault();

      const href = $(e.target).attr('href');
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

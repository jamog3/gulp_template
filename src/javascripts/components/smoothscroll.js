import $ from 'jquery';

export const smoothScroll = (y = 0) => {
  const $anchorLink = $('a[href^="#"]');

  $anchorLink.on('click', (event) => {
    event.preventDefault();
    const href = $(event.target).attr('href');
    const speed = 240;
    const easing = 'swing';
    const target = $(href === '#' || href === '' ? 'html' : href);
    const animateParam = {
      scrollTop: target.offset().top + y
    };
    $('html, body').animate(animateParam, speed, easing);
  });
};

export default smoothScroll;

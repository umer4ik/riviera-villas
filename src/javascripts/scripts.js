// Load jQuery from NPM
import $ from 'jquery';
import LocomotiveScroll from 'locomotive-scroll';
import gsap, { TimelineLite } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import getDOM from './dom';

gsap.registerPlugin(CSSPlugin);

// Force CSSPlugin to not get dropped during build
window.jQuery = $;
window.$ = $;
require('jquery-modal');

const splitText = () => {
  const elements = document.querySelectorAll('.split-text');
  if (elements) {
    for (let i = 0; i < elements.length; i += 1) {
      const element = elements[i];
      element.innerHTML = `<span>${element.textContent.split('').join('</span><span>')}</span>`.replace(/ /g, '&nbsp;');
      const chars = element.querySelectorAll('span');
      for (let j = 0; j < chars.length; j += 1) {
        const char = chars[j];
        char.innerHTML = `
          <span class="visible-char">${char.textContent}</span>
          <span class="invisible-char">${char.textContent}</span>
        `;
      }
    }
  }
  const wordElements = document.querySelectorAll('.split-word');
  if (wordElements) {
    for (let i = 0; i < wordElements.length; i += 1) {
      const element = wordElements[i];
      element.innerHTML = `<span>${element.textContent.split(' ').join('</span>&nbsp;<span>')}</span>`;
      const words = element.querySelectorAll('span');
      for (let j = 0; j < words.length; j += 1) {
        const char = words[j];
        char.innerHTML = `
          <span class="visible-word">${char.textContent}</span>
          <span class="invisible-word">${char.textContent}</span>
        `;
      }
    }
  }
};

const animationConfig = {
  duration: 0.4,
  opacity: 1,
  y: 0,
  transformOrigin: '0% 50%',
  ease: 'power2',
  stagger: 0.05,
};

const imgAnimationConfig = {
  duration: 2,
  opacity: 1,
  ease: 'power2',
  stagger: 0.05,
};

const animateTitle = () => {
  const splitTitle = document.querySelectorAll('.reloading__title .split-text .invisible-char');
  const splitDescription = document.querySelectorAll('.reloading__description .split-text .invisible-char');
  const bg = document.querySelector('.reloading__bg');
  const tl = new TimelineLite();
  // const tlDescription = new TimelineLite();
  tl.to(
    splitTitle,
    animationConfig,
  ).to(
    splitDescription,
    animationConfig,
    '-=1',
  ).to(
    bg,
    {
      ...animationConfig,
      duration: 2,
    },
    '-=0.5',
  );
};

const load = () => new Promise((resolve) => {
  setTimeout(
    () => {
      resolve();
    },
    1000,
  );
});

$(() => {
  splitText();
  const DOM = getDOM();
  const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    // lerp: .05,
  });

  const animateBrand = () => {
    const {
      bg,
      headerWords,
      textTopChars,
      description,
      newColorsTitle,
      newColorsItems,
    } = DOM.brand;
    const tl = new TimelineLite();
    tl
      .to(bg, imgAnimationConfig)
      .to(textTopChars, animationConfig, '-=1')
      .to(headerWords, animationConfig, '-=1')
      .to(description, animationConfig, '-=1')
      .to(newColorsTitle, animationConfig, '-=0.5')
      .to(newColorsItems, animationConfig, '-=0.5');
  };

  const animateVToV = () => {
    const {
      titleChars,
      videos,
    } = DOM.vToV;
    const tl = new TimelineLite();
    tl
      .to(titleChars, animationConfig)
      .to(videos, { ...animationConfig, stagger: .1 }, '-=1');
  };

  const animateTer = () => {
    const {
      topLine,
      text,
      botLine,
      images,
    } = DOM.ter;
    const tl = new TimelineLite();
    tl
      .to(topLine, animationConfig)
      .to(text, animationConfig, '-=1')
      .to(images, imgAnimationConfig, '-=1')
      .to(botLine, animationConfig, '-=2');
  };

  const animateG = () => {
    const {
      lines,
    } = DOM.g;
    const tl = new TimelineLite();
    tl
      .to(lines, animationConfig);
  };

  const animateGWhite = () => {
    const {
      title,
      text,
      button,
    } = DOM.g;
    const tl = new TimelineLite();
    tl
      .to(title, animationConfig)
      .to(text, animationConfig, '-=0.5')
      .to(button, animationConfig, '-=0.25');
  };

  const animatePlans = () => {
    const {
      title,
      description,
    } = DOM.plans;
    const tl = new TimelineLite();
    tl
      .to(title, animationConfig)
      .to(description, animationConfig, '-=0.5');
  };

  const animateLand = () => {
    const {
      button,
    } = DOM.land;
    const tl = new TimelineLite();
    tl.to(button, animationConfig);
  };

  const animateE = () => {
    const {
      logo,
      topLine,
      text,
      bottomLine,
      button,
    } = DOM.e;
    const tl = new TimelineLite();
    tl
      .to(logo, animationConfig)
      .to(topLine, animationConfig, '-=0.5')
      .to(text, animationConfig, '-=0.5')
      .to(bottomLine, animationConfig, '-=0.5')
      .to(button, animationConfig, '-=0.5');
  };

  load()
    .then(() => {
      animateTitle();
    });
  $('.feedback').on('modal:close', () => {
    $('.form .input').removeClass(['has-value', 'focus', 'invalid']);
    $('.form input, .form textarea').val('');
  });

  $('.button:not(.button--blue)').on('click', () => {
    $('.feedback').modal({
      fadeDuration: 200,
    });
    setTimeout(() => {
      $('[name="name"]').focus();
    }, 400);
  });
  $('.input__field').on('focus', function onInputFocus() {
    $(this).closest('.input').addClass('focus');
  });
  $('.input__field').on('blur', function onInputBlur() {
    $(this).closest('.input').removeClass('focus');
  });
  $('.input__field').on('input', function onInputInput() {
    $(this).closest('.input').toggleClass('has-value', !!$(this).val());
    $(this).closest('.input').removeClass('invalid');
  });
  $('form').on('submit', function onFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    let isInvalid = false;
    const name = $('[name="name"]');
    const phone = $('[name="phone"]');
    if (!name.val()) {
      name.closest('.input').addClass('invalid');
      isInvalid = true;
    }
    if (!phone.val()) {
      phone.closest('.input').addClass('invalid');
      isInvalid = true;
    }
    if (isInvalid) {
      return;
    }
    if (window.onSubmitForm) {
      window.onSubmitForm($(this).serialize());
    }
  });

  $(DOM.vToV.videos).on('click', function onVideoClick(e) {
    const place = $(this).find('.v-to-v__video-place');
    if ($(this).find('.play').hasClass('visible')) {
      const youtubeId = $(this).attr('data-video');
      const iframe = `<iframe width="${place.width()}" height="${place.height()}" src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      place.html(iframe);
      $(this).find('.play').toggleClass('visible');
      $(this).find('.stop').toggleClass('visible');
    } else if ($(e.target).closest('.v-to-v__play')) {
      place.html('');
      $(this).find('.play').toggleClass('visible');
      $(this).find('.stop').toggleClass('visible');
    }
  });
  scroll.on('scroll', (e) => {
    const offsetTop = e.scroll.y;
    $(DOM.fixedLeftSide).toggleClass('scrolled', offsetTop > 100);
    const winHeight = $(window).height();
    if ($(DOM.brand.self).offset().top < winHeight) {
      animateBrand();
    }
    if ($(DOM.vToV.self).offset().top < winHeight) {
      animateVToV();
    }
    if ($(DOM.ter.self).offset().top < winHeight) {
      animateTer();
    }
    if ($(DOM.g.green).offset().top < winHeight) {
      animateG();
    }
    if ($(DOM.g.white).offset().top < winHeight) {
      animateGWhite();
    }
    if ($(DOM.plans.self).offset().top < winHeight) {
      animatePlans();
    }
    if ($(DOM.land.self).offset().top < winHeight) {
      animateLand();
    }
    if ($(DOM.e.self).offset().top < winHeight) {
      animateE();
      $(DOM.scrollPlease).fadeOut();
    } else {
      $(DOM.scrollPlease).fadeIn();
    }
  });
});

window.onSubmitForm = (data) => {
  $.ajax({
    type: 'POST',
    url: '/sendmessage.php',
    data,
    success: (result) => {
      if (result === 'true') {
        window.showThanks();
      }
    },
  });
};

window.showThanks = () => {
  $('.thanks').modal({
    fadeDuration: 200,
  });
};

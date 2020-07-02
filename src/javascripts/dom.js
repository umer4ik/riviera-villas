const qs = (...args) => document.querySelector(...args);
const qsa = (...args) => document.querySelectorAll(...args);
const getDOM = () => ({
  fixedLeftSide: qs('.fixed-left-side'),
  reloadingInner: qs('.reloading__inner'),
  scrollPlease: qs('.scroll-please'),
  brand: {
    self: qs('.brand'),
    bg: qs('.brand .brand__bg'),
    textTopChars: qsa('.brand .brand-text__top .split-text .invisible-char'),
    headerWords: qsa('.brand .brand-text__header .split-word .invisible-word'),
    description: qs('.brand .brand-text__description'),
    newColorsTitle: qsa('.new-colors .new-colors__title .split-text .invisible-char'),
    newColorsItems: qsa('.new-colors__item'),
  },
  vToV: {
    self: qs('.v-to-v'),
    titleChars: qsa('.v-to-v__title .invisible-char'),
    videos: qsa('.v-to-v__video'),
  },
  ter: {
    self: qs('.ter'),
    topLine: qsa('.ter__line:first-child .invisible-char'),
    botLine: qsa('.ter__line:last-child .invisible-char'),
    text: qsa('.ter__text .invisible-word'),
    images: qsa('.ter__image'),
  },
  g: {
    self: qs('.g'),
    lines: qsa('.g__line .invisible-char'),
    green: qs('.g__green'),
    white: qs('.g__white'),
    title: qsa('.g__title .invisible-char'),
    text: qsa('.g__description'),
    button: qs('.g .button'),
  },
  plans: {
    self: qs('.plans'),
    title: qsa('.plans__title .invisible-char'),
    description: qs('.plans__description'),
  },
  land: {
    self: qs('.land'),
    button: qs('.land .button'),
  },
  e: {
    self: qs('.e'),
    logo: qsa('.e__logo'),
    topLine: qsa('.e__line:not(.e__line--rotate) .invisible-char'),
    text: qsa('.e__text .invisible-char'),
    bottomLine: qsa('.e__line--rotate .invisible-char'),
    button: qs('.e .button'),
  },
});

export default getDOM;

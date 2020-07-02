const defaultOptions = {
  onStop: () => {},
  onStart: () => {},
  draw: () => {},
  duration: 1000,
  easing: (t) => t,
};
/*
const start = parseFloat(DOM.reloadingInner.style.transform.replace(/[^\d.]/g, '') || 0);
  const end = scrollTop / 2.5;
  if (reloadingInnerAnimation) {
    reloadingInnerAnimation.stop();
  }
  reloadingInnerAnimation = animation({
    draw: (progress) => {
      const transform = ((progress * (end - start)) + start);
      $(DOM.reloadingInner).css({
        transform: `translateY(${transform}px)`,
      });
    },
    duration: 400,
    // easing: inOutCube,
  });
  reloadingInnerAnimation.start();
*/
export default function animation(inputOptions) {
  const options = {
    ...defaultOptions,
    ...inputOptions,
  };
  const result = {
    progress: false,
    stop() {
      this.progress = false;
      if (options.onStop) options.onStop();
    },
    start() {
      options.onStart();
      const start = performance.now();
      this.progress = true;
      let frame = requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;
        const progress = options.easing(timeFraction);
        if (timeFraction < 1 && result.progress) {
          options.draw(progress);
          frame = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(frame);
          result.stop();
        }
      });
    },
  };
  return result;
}

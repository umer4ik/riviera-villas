/* eslint-disable */
(function () {
  window.runNSB = function() {
    if (window.location.pathname.indexOf('/genplan/') !== -1 || window.location.pathname.indexOf('/riviera-lounch/') !== -1) {
      return
    }
    const main = document.querySelector('main.main');
    const block = document.createElement('div');
    block.className = 'nsb'
    block.innerHTML = `
      <a href="/riviera-lounch/"></a>
    `
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = '/nsb/style.css'
    document.head.appendChild(style);
    main.prepend(block);
  }
  // if (false) {
    try {
      window.runNSB();
    } catch (error) {
      console.error('RUN NSB SCRIPT ERROR, SEND AN ERROR TO OBYS AGENCY!', 'http://obys.agency/')
      console.error(error)
    }
  // }
}());

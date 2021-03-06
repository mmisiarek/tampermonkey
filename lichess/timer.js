// ==UserScript==
// @name         Lichess Timer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://lichess.org/training/opening
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let interval;

  const state = {
    timeToPrint: 0,
    printResult: false
  }

  setTimeout(() => {
    const node = document.createElement('div');
    node.innerHTML = App();
    document.querySelector('.puzzle__side').appendChild(node);
    document.querySelector('#app a').addEventListener('click', () => runTimer(5));
  });

  function updateTimer() {
    document.querySelector('#counter').innerHTML = Counter();
  }

  function App() {
    return `
      <div id="app" class="puzzle__side__config" style="text-align:center;">
        ${Button()}
        ${Counter()}
      </div>
      `;
  }

  function Counter() {
    return `
      <div id="counter">
        ${state.timeToPrint ? Timer() : ''}
        ${state.printResult ? Result() : ''}
      </div>
      `;
  }

  function Button() {
    return `
      <p>
        <a class="button button-empty">
          Start 5 min
        </a>
      </p>
      `;
  }

  function Timer() {
    return `
      <p>
        <strong style="font-size:42px;">
          ${formatTime(state.timeToPrint)}
        </strong>
      </p>
      `;
  }

  function Result() {
    return `
      <p>
        Result:
           <span style="color:#629924"> ${$('.result-true').length}</span>/<span style="color:#c33">${$('.result-false').length}</span>
      </p>
      `;
  }

  function runTimer(num) {
    const start = Date.now();
    const duration = 1000 * num * 60;
    const end = start + duration;

    if (interval) { clearInterval(interval) }

    interval = setInterval(() => {
      const now = Date.now();
      if (now < end) {
        const elapsed = now - start;
        state.timeToPrint = duration - elapsed;

      } else {
        clearInterval(interval);
        state.printResult = true;

        alert('done')
      }
      updateTimer();
    }, 1000);
  }



  function formatTime(ms) {
    const inSeconds = Math.round(ms / 1000);
    const seconds = inSeconds % 60;
    const minutes = Math.floor(inSeconds / 60);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

})();
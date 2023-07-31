const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let intervalId = null;

refs.btnStart.addEventListener('click', onBtnStartClick);
refs.btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick(evt) {
  intervalId = setInterval(() => {
    evt.target.disabled = true;
    refs.btnStop.disabled = false;

    document.body.style.background = getRandomHexColor();
  }, 1000);
}

function onBtnStopClick(evt) {
  evt.target.disabled = true;
  refs.btnStart.disabled = false;

  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

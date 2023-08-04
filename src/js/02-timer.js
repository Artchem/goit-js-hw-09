import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

let isTimerStop = false;

refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);

    const selectedDate = selectedDates[0].getTime();
    const currentData = Date.now();

    if (currentData < selectedDate) {
      refs.btnStart.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future', {
        position: 'center-top',

        width: '350px',
      });
    }
  },
};

const data = flatpickr('#datetime-picker', options);

function startTimer() {
  const intervalId = setInterval(() => {
    const userSelectedDate = data.selectedDates[0];
    const currentDate = new Date();

    const restTime = userSelectedDate - currentDate;

    const { days, hours, minutes, seconds } = convertMs(restTime);

    console.log(`${days}:${hours}:${minutes}:${seconds}`);

    refs.daysValue.textContent = days;
    refs.hoursValue.textContent = hours;
    refs.minutesValue.textContent = minutes;
    refs.secondsValue.textContent = seconds;

    isTimerStop =
      days === '00' && hours === '00' && minutes === '00' && seconds === '00';

    stopInterval(isTimerStop, intervalId);
  }, 1000);
}

function stopInterval(isValueTimer, valueIntervalId) {
  if (isValueTimer) {
    clearInterval(valueIntervalId);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  btn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.btn.disabled = true;

let userSelectedDate;
let timerInterval;

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

function timeToDispay(num) {
  return String(num).padStart(2, '0');
}

function displayTimeLeft(deltaTime) {
  const days = Math.floor(deltaTime / DAY);
  const hours = Math.floor((deltaTime % DAY) / HOUR);
  const minutes = Math.floor((deltaTime % HOUR) / MINUTE);
  const seconds = Math.floor((deltaTime % MINUTE) / SECOND);
  refs.days.textContent = timeToDispay(days);
  refs.hours.textContent = timeToDispay(hours);
  refs.minutes.textContent = timeToDispay(minutes);
  refs.seconds.textContent = timeToDispay(seconds);
}

function intervalClear() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function checkTimer() {
  const date = userSelectedDate - new Date();
  refs.btn.disabled = !(date > 0);
  displayTimeLeft(!refs.btn.disabled ? date : 0);
  return !refs.btn.disabled;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    checkTimer();
    intervalClear();
  },
};

flatpickr('input#datetime-picker', options);

refs.btn.addEventListener('click', event => {
  intervalClear();

  if (checkTimer()) {
    timerInterval = setInterval(() => {
      const currentDate = new Date();
      const deltaTime = userSelectedDate - currentDate;
      displayTimeLeft(deltaTime);
      if (deltaTime < SECOND) {
        clearInterval(timerInterval);
        displayTimeLeft(0);
      }
    }, 1000);
  }
});

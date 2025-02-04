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
const timeData = {
  selectedDate: null,
  interval: null,
};

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeData.selectedDate = selectedDates[0];
    if (timeData.selectedDate > new Date()) {
      refs.btn.disabled = false;
      displayTimeLeft(timeData.selectedDate - new Date());
    } else {
      displayTimeLeft(0);
    }
    if (timeData.interval) {
      clearInterval(timeData.interval);
      timeData.interval = null;
    }
  },
};

flatpickr('input#datetime-picker', options);

refs.btn.addEventListener('click', event => {
  if (timeData.interval) {
    clearInterval(timeData.interval);
    timeData.interval = null;
  }
  displayTimeLeft(timeData.selectedDate - new Date());

  timeData.interval = setInterval(() => {
    const currentDate = new Date();
    const deltaTime = timeData.selectedDate - currentDate;
    displayTimeLeft(deltaTime);
    if (deltaTime < SECOND) {
      clearInterval(timeData.interval);
      displayTimeLeft(0);
    }
  }, 1000);
});

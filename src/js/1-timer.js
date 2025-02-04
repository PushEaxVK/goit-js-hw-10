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

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

function displayTimeLeft(deltaTime) {
  const days = Math.floor(deltaTime / DAY);
  const hours = Math.floor((deltaTime % DAY) / HOUR);
  const minutes = Math.floor((deltaTime % HOUR) / MINUTE);
  const seconds = Math.floor((deltaTime % MINUTE) / SECOND);
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.dir(selectedDates[0]);
    this.interval = setInterval(() => {
      const currentDate = new Date();
      const selectedDate = selectedDates[0];
      const deltaTime = selectedDate - currentDate;
      displayTimeLeft(deltaTime);
      if (deltaTime < SECOND) {
        clearInterval(this.interval);
      }
    }, 1000);
  },
};

flatpickr('input#datetime-picker', options);

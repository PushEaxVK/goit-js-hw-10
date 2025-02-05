import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  btn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  inputDatetime: document.querySelector('input#datetime-picker'),
};

refs.btn.disabled = true;

let userSelectedDate;
let timerInterval;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function displayTimeLeft(deltaTime) {
  const date = convertMs(deltaTime);
  refs.days.textContent = addLeadingZero(date.days);
  refs.hours.textContent = addLeadingZero(date.hours);
  refs.minutes.textContent = addLeadingZero(date.minutes);
  refs.seconds.textContent = addLeadingZero(date.seconds);
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
    if (!checkTimer()) {
      iziToast.warning({
        title: 'Caution',
        message: 'Please choose a date in the future',
      });
    }
    intervalClear();
  },
};

flatpickr('input#datetime-picker', options);

refs.btn.addEventListener('click', event => {
  intervalClear();

  if (checkTimer()) {
    refs.btn.disabled = true;
    refs.inputDatetime.disabled = true;
    iziToast.info({
      title: 'Info',
      message: 'Timer is start!',
    });
    timerInterval = setInterval(() => {
      const currentDate = new Date();
      const deltaTime = userSelectedDate - currentDate;
      displayTimeLeft(deltaTime);
      if (deltaTime < 1000) {
        clearInterval(timerInterval);
        displayTimeLeft(0);
        refs.btn.disabled = false;
        refs.inputDatetime.disabled = false;
        iziToast.success({
          title: 'OK',
          message: 'End of timer',
        });
      }
    }, 1000);
  }
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

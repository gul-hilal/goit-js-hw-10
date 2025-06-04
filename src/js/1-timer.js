import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;
let selectedDate = null;
let timerId = null;

flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate - Date.now() <= 0) {
      startBtn.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      startBtn.disabled = false;
    }
  },
});

const addLeadingZero = value => String(value).padStart(2, '0');

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
};

const updateClock = ({ days, hours, minutes, seconds }) => {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
};

const updateTimer = () => {
  const diff = selectedDate - Date.now();

  if (diff <= 0) {
    clearInterval(timerId);
    updateClock({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    return;
  }

  updateClock(convertMs(diff));
};

startBtn.addEventListener('click', () => {
  clearInterval(timerId);
  updateTimer();
  timerId = setInterval(updateTimer, 1000);
});

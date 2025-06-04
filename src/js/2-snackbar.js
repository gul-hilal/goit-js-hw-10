import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const delayInput = form.querySelector('input[name="delay"]');
  const stateRadio = form.querySelector('input[name="state"]:checked');
  const delayMs    = Number(delayInput.value);
  const state      = stateRadio ? stateRadio.value : null;

  new Promise((res, rej) => {
    setTimeout(() => {
      state === 'fulfilled' ? res(delayMs) : rej(delayMs);
    }, delayMs);
  })
    .then(ms =>
      iziToast.success({
        message: `✅ Fulfilled promise in ${ms}ms`,
        position: 'topRight',
      })
    )
    .catch(ms =>
      iziToast.error({
        message: `❌ Rejected promise in ${ms}ms`,
        position: 'topRight',
      })
    );

  form.reset();
});

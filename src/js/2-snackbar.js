import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const delayInput      = form.querySelector('input[name="delay"]');
  const fulfilledRadio  = form.querySelector('input[value="fulfilled"]');
  const delayMs         = Number(delayInput.value);
  const state           = fulfilledRadio.checked ? 'fulfilled' : 'rejected';

  new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delayMs) : reject(delayMs);
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

'use strict';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};

function createPromise(isResolved, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isResolved) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(refs.form);
  const data = Object.fromEntries(formData);

  createPromise(data.state === 'fulfilled', data.delay)
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});

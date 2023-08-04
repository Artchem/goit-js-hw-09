import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const firstDelay = Number(evt.target.elements.delay.value);
  const delayStep = Number(evt.target.elements.step.value);
  const amountPromise = evt.target.elements.amount.value;
  let delayPromise = firstDelay;

  for (let i = 1; i <= amountPromise; i += 1) {
    createPromise(i, delayPromise)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // console.log({ position: `${position}`, delay: `${delay}` });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        // console.log({ position: `${position}`, delay: `${delay}` });
      });
    delayPromise += delayStep;
  }
  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

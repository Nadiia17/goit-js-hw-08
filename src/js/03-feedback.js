import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = formEl.querySelector('input[name="email"]');
const messageEl = formEl.querySelector('textarea[name="message"]');

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

fillFormFromStorage();

function onFormInput(event) {
  const currentState = JSON.parse(
    localStorage.getItem('feedback-form-state') || '{}'
  );
  if (event.target.name === 'email') {
    currentState.email = event.target.value;
  }
  if (event.target.name === 'message') {
    currentState.message = event.target.value;
  }
  localStorage.setItem('feedback-form-state', JSON.stringify(currentState));
}

function fillFormFromStorage() {
  const currentState = JSON.parse(
    localStorage.getItem('feedback-form-state') || '{}'
  );

  if (currentState.email) {
    emailEl.value = currentState.email;
  }
  if (currentState.message) {
    messageEl.value = currentState.message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  if (emailEl.value.trim() !== '' && messageEl.value.trim() !== '') {
    event.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
    localStorage.removeItem('feedback-form-state');
  } else {
    alert('Before submit make sure both fields Email & Message are filled in!');
  }
}

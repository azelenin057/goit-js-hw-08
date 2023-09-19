import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onSubmitForm);

let formData = loadLocalStorage(); //Вынес в отдельную функцию. Решил инициализировать formData таким образом, чтобы не происходила перехапись. Логика: Парсит значение из localStorage, а если его нет то просто {}.

function loadLocalStorage() {
  return JSON.parse(localStorage.getItem('feedback-form-state')) || {};
}

function onFormData(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onSubmitForm(event) {
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  event.preventDefault();
  event.currentTarget.reset();
  //Дописал вот это, я просто в шоке
  removeLocal();
  formData = {};
}

// Додав ще одну функцію
//==============================================================\\
function removeLocal() {
  localStorage.removeItem('feedback-form-state');
}
//==============================================================\\

function dataFromLocalStorage() {
  const data = loadLocalStorage();

  const email = document.querySelector('.feedback-form input');

  const message = document.querySelector('.feedback-form textarea');

  email.value = data.email || ''; // Добавил проверку чтобы не было undefined
  message.value = data.message || ''; // Добавил проверку чтобы не было undefined
}

dataFromLocalStorage();

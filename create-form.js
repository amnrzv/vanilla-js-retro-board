import { createComplaintItem } from "./create-complaint";

const createFormForColumn = (column) => {
  const newForm = document.createElement('form');
  const input = document.createElement('input');
  input.ariaLabel = 'enter complaint';
  input.name = 'complaint';
  newForm.appendChild(input);
  newForm.addEventListener('submit', (event) => onFormSubmit(event, column));

  return newForm;
};

const onFormSubmit = (event, column) => {
  const currentForm = event.target;
  event.preventDefault();
  const formData = new FormData(currentForm);
  if (formData.get('complaint').trim() === '') {
    return;
  }

  const item = createComplaintItem(formData.get('complaint'), column);
  currentForm.insertAdjacentElement('beforebegin', item);

  currentForm.reset();
};

export { createFormForColumn, onFormSubmit };
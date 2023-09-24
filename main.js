import { createComplaintItem } from "./create-complaint";

const addColumnButton = document.querySelector('.add-column button');
const columns = Array.from(document.querySelectorAll('.column'));
const firstColumn = columns[0];
const getLastColumn = () => columns[columns.length - 1];
const form = document.querySelector('form');

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

const addColumn = () => {
  const newColumn = document.createElement('div');
  newColumn.classList.add('column');
  const newForm = document.createElement('form');
  const input = document.createElement('input');
  input.ariaLabel = 'enter complaint';
  input.name = 'complaint';
  newForm.appendChild(input);
  newForm.addEventListener('submit', (event) => onFormSubmit(event, newColumn));
  newColumn.appendChild(newForm);

  getLastColumn().insertAdjacentElement('afterend', newColumn);
  columns.push(newColumn);
  setupColumn(newColumn);
};

const setupColumn = (column) => {
  column.addEventListener('dragenter', (event) => {
    event.preventDefault();
  });

  column.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  column.addEventListener('drop', (event) => {
    if (event.target !== column) {
      return;
    }

    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const item = createComplaintItem(data, column);
    event.target.appendChild(item);
  });
};

columns.forEach(setupColumn);

form.addEventListener('submit', (event) => onFormSubmit(event, firstColumn));
addColumnButton.addEventListener('click', addColumn);

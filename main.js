import { createComplaintItem } from "./create-complaint";
import { createFormForColumn, onFormSubmit } from "./create-form";

const addColumnButton = document.querySelector('.add-column button');
const columns = Array.from(document.querySelectorAll('.column'));
const firstColumn = columns[0];
const getLastColumn = () => columns[columns.length - 1];
const form = document.querySelector('form');

const addColumn = () => {
  const newColumn = document.createElement('div');
  newColumn.classList.add('column');
  const newForm = createFormForColumn(newColumn);
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

    event.target.insertAdjacentElement('afterbegin', item);
  });
};

columns.forEach(setupColumn);

form.addEventListener('submit', (event) => onFormSubmit(event, firstColumn));
addColumnButton.addEventListener('click', addColumn);

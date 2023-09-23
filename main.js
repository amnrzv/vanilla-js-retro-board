import './style.css';

const addColumnButton = document.querySelector('.add-column button');
const columns = Array.from(document.querySelectorAll('.column'));
const leftColumn = columns[0];
const getLastColumn = () => columns[columns.length - 1];
const form = document.querySelector('form');

const onFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const item = createComplaintItem(formData.get('complaint'), leftColumn);
  leftColumn.appendChild(item);

  form.reset();
};

const createComplaintItem = (text, column) => {
  const item = document.createElement('div');
  item.classList.add('complaint-item');
  item.setAttribute('draggable', 'true');
  item.innerText = text;

  item.addEventListener('dragstart', (event) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', event.target.innerText);
  });

  item.addEventListener('dragend', (event) => {
    if (event.dataTransfer.dropEffect === 'none') {
      return;
    }

    column.removeChild(event.target);
  });

  return item;
};

const addColumn = () => {
  const newColumn = document.createElement('div');
  newColumn.classList.add('column');
  getLastColumn().insertAdjacentElement('afterend', newColumn);
  columns.push(newColumn);
  setupColumn(newColumn);
};

const setupColumn = (column) => {
  column.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  column.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const item = createComplaintItem(data, column);
    event.target.appendChild(item);
  });
};

columns.forEach(setupColumn);

form.addEventListener('submit', onFormSubmit);
addColumnButton.addEventListener('click', addColumn);

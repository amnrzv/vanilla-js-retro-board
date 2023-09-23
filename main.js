const addColumnButton = document.querySelector('.add-column button');
const columns = Array.from(document.querySelectorAll('.column'));
const leftColumn = columns[0];
const getLastColumn = () => columns[columns.length - 1];
const form = document.querySelector('form');
let shouldDelete = false;

const onFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  if (formData.get('complaint').trim() === '') {
    return;
  }

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
    shouldDelete = true;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', event.target.innerText);
  });

  item.addEventListener('dragend', (event) => {
    if (event.dataTransfer.dropEffect === 'none') {
      return;
    }

    if (shouldDelete) {
      column.removeChild(event.target);
    }
  });

  item.addEventListener('drop', (event) => {
    shouldDelete = false;
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

form.addEventListener('submit', onFormSubmit);
addColumnButton.addEventListener('click', addColumn);

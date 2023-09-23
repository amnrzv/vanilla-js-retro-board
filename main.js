import './style.css';

const leftColumn = document.querySelector('.left');
const rightColumn = document.querySelector('.right');
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
    column.removeChild(event.target);
  });

  return item;
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

setupColumn(rightColumn);
setupColumn(leftColumn);

form.addEventListener('submit', onFormSubmit);

let shouldDelete = false;

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

export { createComplaintItem };
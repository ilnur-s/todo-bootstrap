import onChange from 'on-change';
import '../css/bootstrap.min.css';
import '../css/style.css';

const addButton = document.querySelector('.add-task');
const selectAllButton = document.querySelector('.select-all');
const deleteButton = document.querySelector('.delete-selection');
const list = document.querySelector('.list-group');
const inputArea = document.querySelector('.form-control');

const data = [];

const watchedState = onChange(
  data,
  (__path, passedValue) => {
    const listGroup = document.querySelectorAll('.list-group-item');

    if (listGroup.length < data.length) {
      const listElement = document.createElement('li');
      const inputElement = document.createElement('input');

      inputElement.type = 'checkbox';
      inputElement.classList.add('form-check-input', 'me-2');

      listElement.textContent = data[data.length - 1].value;
      listElement.classList.add('list-group-item', 'list-group-item-action');

      listElement.prepend(inputElement);
      list.append(listElement);

      document.querySelector('.form-control').value = '';
    }

    if (passedValue === true || passedValue === false) {
      data.forEach((task, index) => {
        if (task.done) {
          listGroup[index].classList.add('done');
          listGroup[index].firstChild.checked = true;
        } else {
          listGroup[index].classList.remove('done');
          listGroup[index].firstChild.checked = false;
        }
      });
    }

    if (listGroup.length > data.length) {
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      data.forEach((task) => {
        const listElement = document.createElement('li');
        const inputElement = document.createElement('input');

        inputElement.type = 'checkbox';
        inputElement.classList.add('form-check-input', 'me-2');

        listElement.textContent = task.value;
        listElement.classList.add('list-group-item', 'list-group-item-action');

        listElement.prepend(inputElement);
        list.append(listElement);
      });
    }
  },
);

addButton.addEventListener('click', () => {
  const inputValue = inputArea.value;
  if (inputValue) {
    const task = {
      value: inputValue,
      done: false,
    };
    watchedState.push(task);
  }
});

inputArea.addEventListener('keyup', (event) => {
  const inputValue = inputArea.value;
  if (event.keyCode === 13 && inputValue) {
    const task = {
      value: inputValue,
      done: false,
    };
    watchedState.push(task);
  }
});

selectAllButton.addEventListener('click', () => {
  for (let i = 0; data.length > 0; i += 1) {
    watchedState[i].done = true;
  }
});

deleteButton.addEventListener('click', () => {
  const newData = data.filter((task) => !task.done);
  watchedState.splice(0, data.length, ...newData);
});

list.addEventListener('click', (event) => {
  const targetElement = event.target;
  const indexListElement = Array.from(document.querySelectorAll('.list-group-item')).indexOf(targetElement);
  if (indexListElement !== -1) {
    watchedState[indexListElement].done = !data[indexListElement].done;
  } else {
    const indexInputElement = Array.from(document.querySelectorAll('.form-check-input')).indexOf(targetElement);
    watchedState[indexInputElement].done = !data[indexInputElement].done;
  }
});

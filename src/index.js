import onChange from 'on-change';
import '../css/bootstrap.min.css';
import '../css/style.css';

const addButton = document.querySelector('.add-task');
const selectAllButton = document.querySelector('.select-all');
const deleteButton = document.querySelector('.delete-selection');

const data = [];

const watchedState = onChange(
  data,
  (__path, state) => {
    if (document.querySelectorAll('li').length < data.length) {
      const olElement = document.querySelector('ol');
      const liElement = document.createElement('li');
      liElement.textContent = data[data.length - 1].value;
      olElement.append(liElement);
      document.querySelector('.form-control').value = '';
    }

    if (state === true) {
      data.forEach((task, index) => {
        const allTasks = document.querySelectorAll('li');
        if (task.done) {
          allTasks[index].classList.add('done');
        } else {
          allTasks[index].classList.remove('done');
        }
      });
    }

    if (document.querySelectorAll('li').length > data.length) {
      const olElement = document.querySelector('ol');
      while (olElement.firstChild) {
        olElement.removeChild(olElement.firstChild);
      }
      data.forEach((task) => {
        const liElement = document.createElement('li');
        liElement.textContent = task.value;
        olElement.append(liElement);
      });
    }
  },
);

addButton.addEventListener('click', () => {
  const inputValue = document.querySelector('.form-control').value;
  if (inputValue) {
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
  watchedState.splice(0, ...newData);
});

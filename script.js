const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-tasks');


loadEventListeners();

function loadEventListeners() {

  document.addEventListener('DOMContentLoaded', getTasks);

  form.addEventListener('submit', addTask);

  taskList.addEventListener('click', removeTask);

  clearBtn.addEventListener('click', clearTask);

  filter.addEventListener('keyup', filterTask);

}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center';
    li.appendChild(document.createTextNode(task));
    const i = document.createElement('i');
    i.className = 'fa fa-trash text-start text-danger delete-item';
    li.appendChild(i);

    taskList.appendChild(li);

  });
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Enter the task first');
  } else {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center';
    li.appendChild(document.createTextNode(taskInput.value));
    const i = document.createElement('i');
    i.className = 'fas fa-times text-danger text-end mr-auto delete-item';
    li.appendChild(i);

    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();

  }

}

function storeTaskInLocalStorage(task) {

  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {

  if (e.target.classList.contains('delete-item')) {
    if (confirm('Are you sure you want to delete the task?')) {
      e.target.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement);
    }
  }

}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask() {
  taskList.innerHTML = '';
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.list-group-item').forEach(function(task) {
    const item = task.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.classList.add("d-flex");
    } else {
      task.classList.remove("d-flex");
      task.style.display = 'none';
    }

  });

}
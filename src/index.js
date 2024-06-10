import { Todo , displayTodo } from './todos.js';

//define html elements
const newTask = document.querySelector('#new_task');
const addTask = document.querySelector('#add_task');
const formDialog = document.querySelector('#form_dialog');

newTask.addEventListener('click', () => {
    formDialog.showModal();
});

addTask.addEventListener('click', (e) => {
    e.preventDefault();
    let taskTitle = document.getElementById('title').value;
    let taskDescription = document.getElementById('description').value;

    let todo = new Todo(taskTitle, taskDescription);
    console.log(todo);
    displayTodo(todo);
    formDialog.close();
});
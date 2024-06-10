import { TodoObj, pushTodo , renderTodo, todoDiv } from './todos.js';

let newTaskBtn = document.querySelector('.create_new_task');


newTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let taskTitle = document.querySelector('.new_task').value;
    new TodoObj(taskTitle);
    pushTodo(taskTitle);
    todoDiv.innerText = '';
    renderTodo();
});


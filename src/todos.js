import { pushToArray } from "./lists";

const todoDiv = document.querySelector('.tasks');
const todos = [];

function TodoObj(title, date, priority) {
    this.title = title;
    this.date = date;
    this.priority = priority;
}

function renderTodo(){
    todoDiv.innerText = '';
    todos.forEach((todo, i) => {
        let currentTodoDiv = todoDiv.innerHTML;
        todoDiv.innerHTMl = '';
        let displayTodo = (
            `<div class='task-${i}'>
                <input
                    type="checkbox"
                    id='task-${i}'
                />
                <label for='task-${i}'>${todo.title}</label>
                <p>${todo.date}</p>
                <p>${todo.priority}</p>
            </div>`
        );

        let amendedTodoDiv = currentTodoDiv + displayTodo;
        todoDiv.innerHTML = amendedTodoDiv;
    });
};

function todoHandler(){
    let taskTitle = document.querySelector('.new_task').value;
    let taskDate = document.querySelector('#date').value;
    let taskPriority = document.querySelector('#priority').value;

    let task = new TodoObj(taskTitle, taskDate, taskPriority);
    pushToArray(todos, task);
    renderTodo();
}

export { todoHandler }
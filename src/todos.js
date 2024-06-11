import { pushToArray } from "./lists";

const todoDiv = document.querySelector('.tasks');
const todos = [];

function TodoObj(title) {
    this.title = title;
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
            </div>`
        );

        let amendedTodoDiv = currentTodoDiv + displayTodo;
        todoDiv.innerHTML = amendedTodoDiv;
    });
};

function todoHandler(){
    let taskTitle = document.querySelector('.new_task').value;
    let task = new TodoObj(taskTitle);
    pushToArray(todos, task);
    renderTodo();
}

export { todoHandler }
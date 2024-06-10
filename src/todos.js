const todoDiv = document.querySelector('.tasks');

const todos = [];

function TodoObj(title) {
    this.title = title;
}

function pushTodo (todo) {
    todos.push(todo);
    console.log(todos);
}

function renderTodo(){

    todos.forEach((todo, i) => {
        let currentTodoDiv = todoDiv.innerHTML;
        todoDiv.innerHTMl = '';
        let displayTodo = (
            `<div class='task-${i}'>
                <input
                    type="checkbox"
                    id='task-${i}'
                />
                <label for='task-${i}'>${todo}</label>
            </div>`
        );

        let amendedTodoDiv = currentTodoDiv + displayTodo;
        todoDiv.innerHTML = amendedTodoDiv;
    });
}

export { TodoObj, pushTodo , renderTodo, todoDiv }
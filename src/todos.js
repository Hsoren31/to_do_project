// make todos an object
function Todo(title, description){
    this.title = title;
    this.description = description;
};

function displayTodo(todoObj){
    let todoSection = document.getElementById('todos');
    let todoDiv = document.createElement('div');
    let todoTitle = document.createElement('h2');
    let todoDescription = document.createElement('p');

    todoTitle.textContent = todoObj.title;
    todoDescription.textContent = todoObj.description;
    todoDiv.append(todoTitle, todoDescription);
    todoSection.append(todoDiv);
};

export { Todo, displayTodo };
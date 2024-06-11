import { TodoObj, pushTodo , renderTodo, todoDiv } from './todos.js';
import { FolderObj, pushfolder, renderFolders, folderDiv } from './lists.js';

let newTaskBtn = document.querySelector('.create_new_task');
let newFolderBtn = document.querySelector('.create_new_list');

newTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('hello');
    let taskTitle = document.querySelector('.new_task').value;
    new TodoObj(taskTitle);
    pushTodo(taskTitle);
    todoDiv.innerText = '';
    renderTodo();
});

newFolderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let folderName = document.querySelector('.new_list').value;
    new FolderObj(folderName);
    pushfolder(folderName);
    folderDiv.innerText = '';
    renderFolders();
});

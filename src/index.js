import { todoHandler } from './todos.js';
import { folderHandler } from './lists.js';

let newTaskBtn = document.querySelector('.create_new_task');
let newFolderBtn = document.querySelector('.create_new_list');

newTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    todoHandler();
});

newFolderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    folderHandler();
});

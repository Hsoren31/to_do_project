import { todoHandler } from './todos.js';
import { folderHandler, saveAndRender, deleteFolder, selectFolderHandler } from './lists.js';

let newTaskBtn = document.querySelector('.create_new_task');
let newFolderBtn = document.querySelector('.create_new_list');
let deleteFolderBtn = document.querySelector('.delete_folder');
let folderDiv = document.querySelector('#folders');

saveAndRender();

newTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    todoHandler();
});

newFolderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    folderHandler();
});

deleteFolderBtn.addEventListener('click', () => {
    deleteFolder();
});

folderDiv.addEventListener('click', (e) => {
    console.log(e);
    selectFolderHandler(e);
});
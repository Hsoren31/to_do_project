import './style.css';
import { folderDiv, folderHandler, saveAndRender, deleteFolder,
    selectFolderHandler, todoHandler } from './lists.js';

let newTaskBtn = document.querySelector('.create_new_task');
let newFolderBtn = document.querySelector('.create_new_list');
let deleteFolderBtn = document.querySelector('.delete_folder');


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
    selectFolderHandler(e);
});
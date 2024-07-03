import './style.css';
import { folderDiv, folderHandler, saveAndRender, deleteFolder,
    selectFolderHandler, todoHandler } from './lists.js';

let newTaskBtn = document.querySelector('.create_new_task');
let newFolderBtn = document.querySelector('.create_new_list');
let deleteFolderBtn = document.querySelector('.delete_folder');
let openFolderForm = document.querySelector('[open-folder-form]');
let folderForm = document.querySelector('[folder-form]');
const openTaskForm = document.querySelector('[open-task-form]');
const taskForm = document.querySelector('[task-form]');
const cancelButton = document.querySelectorAll('.cancel');
console.log(cancelButton);

saveAndRender();

newTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    todoHandler();
    taskForm.close();
});

newFolderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    folderHandler();
    folderForm.close();
});

deleteFolderBtn.addEventListener('click', () => {
    deleteFolder();
});

folderDiv.addEventListener('click', (e) => {
    selectFolderHandler(e);
});

openFolderForm.addEventListener('click', (e) => {
    e.preventDefault();
    folderForm.showModal();
});

openTaskForm.addEventListener('click', (e) => {
    e.preventDefault();
    taskForm.showModal();
});

cancelButton.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        folderForm.close();
        taskForm.close();
    })
})
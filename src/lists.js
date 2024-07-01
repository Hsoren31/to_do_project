const folderDiv = document.querySelector('#folders');
const todoDiv = document.querySelector('.tasks');
const LOCAL_STORAGE_LIST_KEY = 'tasks.folders';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let tasksHeader = document.querySelector('.todo-list-header > h2');
let folders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

function deleteFolder(){
    folders = folders.filter((folder) => {
        return folder.id === selectedListId ? false : true;
    });
    selectedListId = null;
    tasksHeader.innerText = null;
    saveAndRender();
};

function FolderObj(name) {
   return { id: Date.now().toString(), name: name, tasks: []}
};

function pushToArray(array, item){
    array.push(item);
}

function saveFolders(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(folders));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function renderFolders(){
    clearElement(folderDiv);
    folders.forEach((folder) =>{
        const folderElement = document.createElement('li');
        folderElement.dataset.listId = folder.id;
        folderElement.classList.add('list-name');
        folderElement.innerText = folder.name;
        if(folder.id === selectedListId){
            folderElement.style.color = 'blue';
            folderElement.classList.add('selected-folder');
            tasksHeader.innerText = folder.name;
        };
        folderDiv.appendChild(folderElement);
    });
};

function saveAndRender(){
    saveFolders();
    renderFolders();
}

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    };
};

function folderHandler(){  //handler for adding new list
    let folderName = document.querySelector('.new_list').value;
    if (folderName == null || folderName === '') return;
    let folder = new FolderObj(folderName);
    pushToArray(folders, folder);
    saveAndRender();
};

function selectFolderHandler(e){
    if (e.target.tagName.toLowerCase() === 'li'){
        selectedListId = e.target.dataset.listId;
    };
    saveAndRender();
}

function TodoObj(title, date, priority) {
    return { title: title, date: date, priority: priority };
};

function renderTodo() {
    clearElement(todoDiv);
    selectedListTasks.forEach((todo, i) => {
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

function todoHandler() {
    let taskTitle = document.querySelector('.new_task').value;
    let taskDate = document.querySelector('#date').value;
    let taskPriority = document.querySelector('#priority').value;

    let task = new TodoObj(taskTitle, taskDate, taskPriority);
    pushToArray(selectedListTasks, task);
    renderTodo();
}

export { pushToArray, folderHandler, clearElement, saveAndRender, deleteFolder,
    selectFolderHandler, todoHandler, folderDiv
}
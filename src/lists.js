const folderDiv = document.querySelector('#folders');
const folderInput = document.querySelector('.new_list');
const todoDiv = document.querySelector('.tasks');
const taskTemplate = document.querySelector('#task-template');
const tasksHeader = document.querySelector('#tasks-header');
const tasksNameInput = document.querySelector('.new_task');
const taskDateInput = document.querySelector('.input-date');
const taskPriorityInput = document.querySelector('#priority');

const LOCAL_STORAGE_LIST_KEY = 'tasks.folders';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let folders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    };
};

function FolderObj(name) {
    return { id: Date.now().toString(), name: name, tasks: []}
 };

 function TodoObj(name, date, priority) {
    return { id: Date.now().toString(), complete: false,
         name: name, date: date, priority: priority}
};

function render(){
    clearElement(folderDiv);
    renderFolders();

    const selectedList = folders.find(folder => folder.id === selectedListId);
    if(selectedList == null){
        todoDiv.style.display = 'none';
    } else {
        todoDiv.style.display = '';
        tasksHeader.innerText = selectedList.name;
        //render tasks
        clearElement(todoDiv);
        renderTodo(selectedList);
    }
}

function renderFolders(){
    folders.forEach((folder) =>{
        const folderElement = document.createElement('li');
        folderElement.dataset.listId = folder.id;
        folderElement.classList.add('list-name');
        folderElement.innerText = folder.name;
        if(folder.id === selectedListId){
            folderElement.classList.add('selected-folder');
        };
        folderDiv.appendChild(folderElement);
    });
};

function saveFolders(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(folders));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function saveAndRender(){
    saveFolders();
    render();
}

function deleteFolder(){
    folders = folders.filter((folder) => {
        return folder.id === selectedListId ? false : true;
    });
    selectedListId = null;
    tasksHeader.innerText = null;
    saveAndRender();
};

function folderHandler(){
    let folderName = folderInput.value;
    if (folderName == null || folderName === '') return;
    let folder = new FolderObj(folderName);
    folders.push(folder);
    selectedListId = folder.id;
    saveAndRender();
    folderInput.value = null;
};

function selectFolderHandler(e){
    if (e.target.tagName.toLowerCase() === 'li'){
        selectedListId = e.target.dataset.listId;
    };
    saveAndRender();
}

function renderTodo(selectedList) {
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label = taskElement.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.name);
        const dueDateElement = taskElement.querySelector('#due-date');
        dueDateElement.innerText = task.date;
        const priorityElement = taskElement.querySelector('#priority');
        priorityElement.innerText = task.priority;
        todoDiv.appendChild(taskElement);
    });
};

function todoHandler() {
    let taskTitle = tasksNameInput.value;
    if (taskTitle == null || taskTitle === '') return;
    let taskDate = taskDateInput.value;
    let taskPriority = taskPriorityInput.value;
    const task = new TodoObj(taskTitle, taskDate, taskPriority);

    const selectedList = folders.find(folder => folder.id === selectedListId);
    selectedList.tasks.push(task);
    saveAndRender();
    tasksNameInput.value = null;
}

export { folderHandler, clearElement, saveAndRender, deleteFolder,
    selectFolderHandler, todoHandler, folderDiv
}
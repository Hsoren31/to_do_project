const folderDiv = document.querySelector('#folders');
const todoDiv = document.querySelector('.tasks');
const taskTemplate = document.querySelector('#task-template');
let tasksHeader = document.querySelector('.todo-list-header > h2');

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

 function TodoObj(name) {
    return { id: Date.now().toString(), name: name, complete: false}
};

function render(){
    clearElement(folderDiv);
    renderFolders();

    const selectedList = folders.find(folder => folder.id === selectedListId);
    console.log(selectedList);
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
    console.log(folders);
    folders.forEach((folder) =>{
        const folderElement = document.createElement('li');
        folderElement.dataset.listId = folder.id;
        folderElement.classList.add('list-name');
        folderElement.innerText = folder.name;
        if(folder.id === selectedListId){
            folderElement.style.color = 'blue';
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

function folderHandler(){  //handler for adding new list
    let folderName = document.querySelector('.new_list').value;
    if (folderName == null || folderName === '') return;
    let folder = new FolderObj(folderName);
    folders.push(folder);
    saveAndRender();
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
        todoDiv.appendChild(taskElement);
    });
};

function todoHandler() {
    let taskTitle = document.querySelector('.new_task').value;
    // let taskDate = document.querySelector('#date').value;
    // let taskPriority = document.querySelector('#priority').value;
    console.log(taskTitle);
    const task = new TodoObj(taskTitle);
    const selectedList = folders.find(folder => folder.id === selectedListId);
    selectedList.tasks.push(task);
    saveAndRender();
}

export { folderHandler, clearElement, saveAndRender, deleteFolder,
    selectFolderHandler, todoHandler, folderDiv
}
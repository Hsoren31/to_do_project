let folderDiv = document.querySelector('#folders');
let tasksHeader = document.querySelector('.todo-list-header > h2');

const LOCAL_STORAGE_LIST_KEY = 'tasks.folders';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let folders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

function deleteFolder(){
    folders = folders.filter((folder) => {
        return folder.id.toString() === selectedListId ? false : true;
    });
    console.log(folders);
    selectedListId = null;
    tasksHeader.innerText = null;
    saveAndRender();
};

function FolderObj(name) {
   return { id: Date.now(), name: name, tasks: []}
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
        if(folder.id.toString() === selectedListId){
            folderElement.style.color = 'blue';
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

function folderHandler(){
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

export { pushToArray, folderHandler, clearElement, saveAndRender, deleteFolder,
    selectFolderHandler
}
const folderDiv = document.querySelector('#folders');

const LOCAL_STORAGE_LIST_KEY = 'tasks.folders';
let folders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

function FolderObj(name) {
   return { id: Date.now(), name: name, tasks: []}
};

function pushToArray(array, item){
    array.push(item);
}

function saveFolders(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(folders));
}

function renderFolders(){
    clearElement(folderDiv);
    folders.forEach((folder) =>{
        const folderElement = document.createElement('li');
        folderElement.dataset.listId = folder.id;
        folderElement.classList.add('list-name');
        folderElement.innerText = folder.name;
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
    console.log(folders);
};


export { pushToArray, folderHandler, clearElement, saveAndRender }
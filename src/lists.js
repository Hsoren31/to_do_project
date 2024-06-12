const folderDiv = document.querySelector('#folders');

const folders = [];

function FolderObj(name) {
   return { id: Date.now(), name: name}
};

function pushToArray(array, item){
    array.push(item);
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
    renderFolders();
};


export { pushToArray, folderHandler }
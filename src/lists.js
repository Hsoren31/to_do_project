const folderDiv = document.querySelector('.folders');
const folders = [];

function FolderObj(folderName) {
    this.folderName = folderName;
}

function pushToArray(array, item){
    array.push(item);
}

function renderFolders(){
    folderDiv.innerText = '';
    folders.forEach((folder) =>{
        let currentFolderDiv = folderDiv.innerHTML;
        folderDiv.innerHTML = '';
        let displayFolder = (
            `<li>${folder.folderName}</li>`
        );
        
        let amendedFolderDiv = currentFolderDiv + displayFolder;
        folderDiv.innerHTML = amendedFolderDiv;
    });
};

function folderHandler(){
    let folderName = document.querySelector('.new_list').value;
    let folder = new FolderObj(folderName);
    pushToArray(folders, folder);
    renderFolders();
};

export { pushToArray, folderHandler }
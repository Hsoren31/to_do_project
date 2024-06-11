const folderDiv = document.querySelector('.folders');

const folders = [];

function FolderObj(folderName) {
    this.folderName = folderName;
}

function pushfolder(folder) {
    folders.push(folder);
    console.log(folders);
}

function renderFolders(){
    folders.forEach((folder) =>{
        let currentFolderDiv = folderDiv.innerHTML;
        folderDiv.innerHTML = '';
        let displayFolder = (
            `<li>${folder}</li>`
        );
        
        let amendedFolderDiv = currentFolderDiv + displayFolder;
        folderDiv.innerHTML = amendedFolderDiv;
    });
};

export { FolderObj, pushfolder, renderFolders, folderDiv }
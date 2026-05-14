function initializeLocalStorage() {
    localStorage.setItem('folders', JSON.stringify([]));
}

function addFolderToStorage(obj) {
    let foldersArr = getDataFromStorage()
    foldersArr.push(obj)
    localStorage.setItem('folders', JSON.stringify(foldersArr))
}

function getDataFromStorage() {
    return JSON.parse(localStorage.getItem('folders'))
}

function addTasktoStorage(task, id) {
    let folders = getDataFromStorage()
    for (let folder of folders) {
        if (folder.id === id) {
            folder.tasks.push(task)
        }
    }
    localStorage.setItem('folders', JSON.stringify(folders))
    console.log('run successful')
}

function removeFolderFromStorage(id){
    let folders = getDataFromStorage()
    if(folders.length === 1){
        alert("Can't Delete all folders")
        return
    }
    folders = folders.filter((item) => item.id !== id)
    localStorage.setItem('folders', JSON.stringify(folders))
}

function removeTaskFromStorage(folderId, taskId){
    let folders = getDataFromStorage()
    let requiredFolder = folders.find((item) => item.id === folderId);
    for(let task of requiredFolder.tasks){
        requiredFolder.tasks = requiredFolder.tasks.filter((taskItem) => taskItem.id !== taskId)
    }

    localStorage.setItem('folders', folders)
}

export { initializeLocalStorage, addFolderToStorage, getDataFromStorage, addTasktoStorage, removeFolderFromStorage }
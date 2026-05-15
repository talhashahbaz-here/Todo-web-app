
// Add an empty array in local storage.
function initializeLocalStorage() {
    localStorage.setItem('folders', JSON.stringify([]));
}


// Add a folder to local storage
function addFolderToStorage(obj) {
    let foldersArr = getDataFromStorage()
    foldersArr.push(obj)
    localStorage.setItem('folders', JSON.stringify(foldersArr))
}

// get folders Array from local storage
function getDataFromStorage() {
    return JSON.parse(localStorage.getItem('folders'))
}


// Add new task to local storage
function addTaskToStorage(task, folderId) {
    let folders = getDataFromStorage()
    for (let folder of folders) {
        if (folder.id === folderId) {
            folder.tasks.push(task)
        }
    }
    localStorage.setItem('folders', JSON.stringify(folders))
    console.log('run successful')
}

// Remove a Folder From local storage
function removeFolderFromStorage(id){
    let folders = getDataFromStorage()
    if(folders.length === 1){
        alert("Can't Delete all folders")
        return
    }
    folders = folders.filter((item) => item.id !== id)
    localStorage.setItem('folders', JSON.stringify(folders))
}

// Remove a task from local storage.
function removeTaskFromStorage(folderId, taskId){
    let folders = getDataFromStorage()
    let requiredFolder = folders.find((item) => item.id === folderId);
    for(let task of requiredFolder.tasks){
        requiredFolder.tasks = requiredFolder.tasks.filter((taskItem) => taskItem.id !== taskId)
    }

    localStorage.setItem('folders', JSON.stringify(folders))
}

export { initializeLocalStorage, addFolderToStorage, getDataFromStorage, addTaskToStorage, removeFolderFromStorage, removeTaskFromStorage }

const folderList = document.getElementById('all-folders')
const addFolderBtn = document.getElementById('add-folder')
const folderModal = document.getElementById('folder-modal')
const sideBar = document.getElementById('side-bar')
const deleteFolderButton = document.getElementById('delete-folder-btn')
const addFolderSubmit = document.getElementById('add-folder-submit')
const addTaskBtn = document.getElementById('add-task-btn')
const taskModal = document.getElementById('task-modal')
const addTaskSubmit = document.getElementById('add-task-submit')





function populateFolderUl(rootArr) {
    const folderList = document.getElementById('all-folders')
    folderList.replaceChildren()
    let allFolders = rootArr.getAllFolders()
    for (let item of allFolders) {
        let li = document.createElement('li')
        li.classList.add('folder')
        li.id = item.id;
        li.innerHTML = item.name
        folderList.appendChild(li)
    }
}

function showFolderData(id, arr) {
    const folderNameHeading = document.getElementById('current-active-folder');
    const header = document.getElementById('header')
    const tipHeading = document.getElementById('tip-heading')
    const requiredFolder = arr.getSpecificFolder(id)
    folderNameHeading.textContent = requiredFolder.name;

    // for(let task of requiredFolder.tasks){
    //     createTaskDiv(task)
    // }

    header.classList.remove('hidden')
    tipHeading.classList.add('hidden')
}

function createTaskDiv() {
    const div = document.createElement('div')
}

export {
    populateFolderUl, showFolderData,
    folderList, addFolderBtn,
    folderModal, sideBar,
    deleteFolderButton, addFolderSubmit,
    taskModal, addTaskBtn,
    addTaskSubmit
}
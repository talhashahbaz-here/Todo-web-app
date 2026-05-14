const folderList = document.getElementById('all-folders')
const addFolderBtn = document.getElementById('add-folder')
const folderModal = document.getElementById('folder-modal')
const sideBar = document.getElementById('side-bar')
const deleteFolderButton = document.getElementById('delete-folder-btn')
const addFolderSubmit = document.getElementById('add-folder-submit')
const addTaskBtn = document.getElementById('add-task-btn')
const taskModal = document.getElementById('task-modal')
const addTaskSubmit = document.getElementById('add-task-submit')




// Fill the Ul with folder names whenever the root array is updated
function populateFolderUl(rootArr) {
    const folderList = document.getElementById('all-folders')
    folderList.replaceChildren()
    for (let item of rootArr) {
        let li = document.createElement('li')
        li.classList.add('folder')
        li.id = item.id;
        li.innerHTML = item.name
        folderList.appendChild(li)
    }
}


// when a folder is selected, fill the content window with all task from the seleted Folder ( not complete yet )
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
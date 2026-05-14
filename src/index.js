import "./style.css";
import { taskItem, taskItemMethods } from "./tasks.js"
import { rootArray } from "./rootArray.js";
import { Folder, folderMethods } from "./folders.js";
import { getDataFromStorage, initializeLocalStorage, addFolderToStorage, addTasktoStorage } from "./storage.js";
import { createFolder, createTask } from "./createFuncs.js";
import { folderList, addFolderBtn, addFolderSubmit, folderModal, sideBar, deleteFolderButton, showFolderData, addTaskBtn, taskModal, addTaskSubmit } from "./domFuncs.js";

console.log("Working fine")

let currentActiveFolder


// First time website open check, if there are no folders in storage, add a defualt.
if (!localStorage.getItem('folders')) {
    initializeLocalStorage()
    let defaultFolder = new Folder('Default Folder');
    addFolderToStorage(defaultFolder)
}


// setup a root array which will have all folders and there task with their method
let rootArr = rootArray();
rootArr.updateRootArr();


const body = document.body

body.addEventListener('click', (e) => {
    if (e.target === addFolderBtn) {
        folderModal.showModal()
        const folderName = document.getElementById('folderName').value
    }

    else if (e.target === addFolderSubmit) {
        e.preventDefault()
        if (folderName) {
            createFolder(folderName.value)
            rootArr.updateRootArr()
            folderModal.close()
            document.getElementById('folder-form').reset()
            document.getElementById('header').classList.add('hidden')
            document.getElementById('tip-heading').classList.remove('hidden')
        }

        else{
            alert('invalid Input')
        }
    }

    else if (e.target.tagName === 'LI') {
        const li = document.getElementById(e.target.id);
        const currentSelectedFolder = document.querySelector('.folder-selected')
        if (currentSelectedFolder) {
            currentSelectedFolder.classList.remove('folder-selected')
        }
        li.classList.add("folder-selected")
        currentActiveFolder = e.target.id;

        showFolderData(currentActiveFolder, rootArr)
    }

    else if (e.target === deleteFolderButton) {
        rootArr.removeFromArray(currentActiveFolder);
        document.getElementById('header').classList.add('hidden')
    }

    else if(e.target === addTaskBtn){
        taskModal.showModal() 
    }

    else if(e.target === addTaskSubmit){
        e.preventDefault()
        const taskTitle = document.getElementById('task-title').value
        const taskDesc = document.getElementById('task-description').value
        const deuDate = document.getElementById('task-due-date').value
        const priority = document.querySelector('input[name="taskPriority"]:checked')?.value;
        
        if(taskTitle && taskDesc && deuDate && priority){
            document.getElementById('task-form').reset()
            createTask(taskTitle, taskDesc, deuDate, priority, currentActiveFolder)
            rootArr.updateRootArr()
            taskModal.close()
        }

        else{
            alert('Invalid Input')
        }
    }
})
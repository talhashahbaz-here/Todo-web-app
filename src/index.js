import "./style.css";
import { taskItem, taskItemMethods } from "./tasks.js"
import { rootArray } from "./rootArray.js";
import { Folder, folderMethods } from "./folders.js";
import { getDataFromStorage, initializeLocalStorage, addFolderToStorage, addTasktoStorage } from "./storage.js";
import { createFolder, createTask } from "./createFuncs.js";
import { populateFolderUl, folderList, addFolderBtn, addFolderSubmit, folderModal, sideBar, deleteFolderButton, showFolderData, addTaskBtn, taskModal, addTaskSubmit } from "./domFuncs.js";

console.log("Working fine")

let currentActiveFolder

if (!localStorage.getItem('folders')) {
    initializeLocalStorage()
    let defaultFolder = new Folder('Default Folder');
    addFolderToStorage(defaultFolder)
}


let rootArr = rootArray();
rootArr.updateRootArr();
populateFolderUl(rootArr)


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
            populateFolderUl(rootArr)
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
        populateFolderUl(rootArr);
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








addTasktoStorage()



// const createNewTask = (folderToPushName = 'defaultFolder') => {
//     const title = prompt('Enter a title:')
//     const desc = prompt('Enter a Description:')
//     const dueDate = prompt('Enter a Due Date:', 'low')
//     const priority = prompt('Enter a Priority (Default is Low):')

//     const newTask = new taskItem(title, desc, dueDate, priority)
    
// }


// window.rootArr = rootArr;
// window.createNewTask = createNewTask;
// window.createFolder = createFolder;
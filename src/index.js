import "./style.css";
import { taskItem, taskItemMethods } from "./tasks.js"
import { rootArray } from "./rootArray.js";
import { Folder, folderMethods } from "./folders.js";
import { getDataFromStorage, initializeLocalStorage, addFolderToStorage, addTaskToStorage, removeFolderFromStorage, removeTaskFromStorage } from "./storage.js";
import { createFolder, createTask } from "./createFuncs.js";
import { renderFolderData, fillFolderUl, updateFolderUl, pushNewTaskToDOM, removeTaskItemFromDom } from "./domFuncs.js";
import { isPast } from "date-fns";

const folderList = document.getElementById('all-folders')
const addFolderBtn = document.getElementById('add-folder')
const folderModal = document.getElementById('folder-modal')
const sideBar = document.getElementById('side-bar')
const deleteFolderButton = document.getElementById('delete-folder-btn')
const addFolderSubmit = document.getElementById('add-folder-submit')
const addTaskBtn = document.getElementById('add-task-btn')
const taskModal = document.getElementById('task-modal')
const addTaskSubmit = document.getElementById('add-task-submit')
const taskItemContainer = document.getElementById('task-container')

let currentActiveFolder


// First time website open check, if there are no folders in storage, add a defualt.
if (!localStorage.getItem('folders')) {
    initializeLocalStorage()
    let defaultFolder = new Folder('Default Folder');
    addFolderToStorage(defaultFolder)
}


// setup a root array which will have all folders and there task with methods assigned to them
const rootArr = rootArray();
rootArr.updateRootArr();
fillFolderUl(rootArr)


const body = document.body

/*
Single event listener on body to listen all button events
*/
body.addEventListener('click', (e) => {

    // Open a modal when user click on "Add Folder"
    if (e.target === addFolderBtn) {
        folderModal.showModal()
    }
    
    // Listen for button click in add folder form
    else if (e.target === addFolderSubmit) {
        e.preventDefault()
        const folderName = document.getElementById('folderName').value
        if (folderName && folderName.trim() > 0 ) { // Check if user entered a name and name is not just spaces. 
            const newFolder = createFolder(folderName)
            addFolderToStorage(newFolder); // store newly made folder to storage
            rootArr.updateRootArr() // update root array from updated local storage
            updateFolderUl(newFolder, 'add'); // add folder Li to Dom
            document.getElementById('folder-form').reset() 
            folderModal.close()
        }

        else {
            alert('invalid Input') //in case of no input or just spaces
        }
    }

    else if (e.target.tagName === 'LI') { //check for click on a LI.
        const li = document.getElementById(e.target.id); // get LI which use clicked on
        const currentSelectedFolder = document.querySelector('.folder-selected') // get already seleted folder
        if (currentSelectedFolder) { // if there was a already seleted folder remove selected class from it
            currentSelectedFolder.classList.remove('folder-selected')
        }
        li.classList.add("folder-selected") // give seleted class to LI user just clicked
        currentActiveFolder = e.target; // make this element current active folder.

        renderFolderData(currentActiveFolder.id, rootArr) // update contents of content window.
    }

    else if (e.target === deleteFolderButton) {
        rootArr.removeFromArray(currentActiveFolder.id); // deleted currently selected folder
        document.getElementById('header').classList.add('hidden') // hide header in content window
        updateFolderUl(currentActiveFolder, 'remove')
        document.getElementById('task-container').replaceChildren() // remove all tasks of this folder from task container
        document.getElementById('tip-heading').classList.remove('hidden') // show tip, asking user to select a folder
    }

    else if (e.target === addTaskBtn) {
        taskModal.showModal() // open add task modal
    }

    else if (e.target === addTaskSubmit) {
        e.preventDefault()
        // getting value of all inputs
        const taskTitle = document.getElementById('task-title').value
        const taskDesc = document.getElementById('task-description').value
        const deuDate = document.getElementById('task-due-date').value
        const priority = document.querySelector('input[name="taskPriority"]:checked')?.value;

        // if due date user selected is from past show this alert.
        if (isPast(deuDate)) {
            alert('A past Date cannot be a due Date.')
        }

        // other wise check if all fields are filled.
        else if (taskTitle && taskDesc && deuDate && priority) {
            const newTask = createTask(taskTitle, taskDesc, deuDate, priority, currentActiveFolder.id) // create a new task object
            addTaskToStorage(newTask, currentActiveFolder.id) // add task object to local storage
            rootArr.updateRootArr() // update root array.
            renderFolderData(currentActiveFolder.id, rootArr) // render all tasks in content window
            document.getElementById('task-form').reset() // reset form
            taskModal.close()
        }

        else {
            alert('Invalid Input')
        }
    }


})


/*
Task items don't exists initially, so capturing click on task container and checking if buttons from a task item is clicked
*/
taskItemContainer.addEventListener('click', (e) => {
    const deleteTaskBtn = document.querySelector('.btn-task-delete')
    const taskCompleteBtn = document.querySelector('.btn-task-complete')


    // couldn't think of different logic for task complete and task delete, so just deleting a task in both cases
    if (e.target === taskCompleteBtn || e.target === deleteTaskBtn) {
        console.log('btn clicked')
        const parentDiv = e.target.closest('.task-item');
        removeTaskFromStorage(currentActiveFolder.id, parentDiv.id)
        removeTaskItemFromDom(parentDiv.id)
        rootArr.updateRootArr()
    }
})
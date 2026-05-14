import { addFolderToStorage, addTasktoStorage } from "./storage.js";
import { Folder } from "./folders.js";
import { taskItem } from "./tasks.js";


// create new folder and add it to local storage
const createFolder = (name) => {
    const newFolder = new Folder(name)
    addFolderToStorage(newFolder);
}


// create new task and add it to local storage
const createTask = (title, desc, dueDate, priority, currentActiveFolder) => {
    const newTask = new taskItem(title, desc, dueDate, priority);
    addTaskToStorage(newTask, currentActiveFolder);
}


export { createFolder, createTask } 
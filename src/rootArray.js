import { folderMethods } from "./folders.js"
import { joinObjectAndMethods } from "./helperFunctions.js"
import { taskItemMethods } from "./tasks.js"
import { getDataFromStorage, removeFolderFromStorage } from "./storage.js"
import { populateFolderUl } from "./domFuncs.js"

export const rootArray = () => {
    let rootArray = []

    // remove a folder From local storage and update root array.
    function removeFromArray(id) {
        removeFolderFromStorage(id)
        updateRootArr()
    }

    // find a specific folder with ID
    function getSpecificFolder(id) {
        for (let item of rootArray) {
            if (item.getId() === id) {
                return item;
            }
        }
    }

    /* This function clear root Array, get all folders from local storage then save those
    in root array with methods added to them. Then update the Ul in DOM*/
    function updateRootArr() {
        rootArray = []
        let folders = getDataFromStorage()
        for (let folder of folders) {
            joinObjectAndMethods(folder, folderMethods)
            for (let task of folder.tasks){
                joinObjectAndMethods(task, taskItemMethods)
            }
            rootArray.push(folder)
        }
        populateFolderUl(rootArray)
    }


    return {
        removeFromArray, getSpecificFolder, updateRootArr
    }
}
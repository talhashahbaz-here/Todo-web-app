import { folderMethods } from "./folders.js"
import { joinObjectAndMethods } from "./helperFunctions.js"
import { taskItemMethods } from "./tasks.js"
import { getDataFromStorage, removeFolderFromStorage } from "./storage.js"
import { populateFolderUl } from "./domFuncs.js"

export const rootArray = () => {
    let rootArray = []

    function pushFolderToRoot(obj) {
        rootArray.push(obj)
    }

    function getAllFolders() {
        let allFolders = []
        for(let item of rootArray){
            allFolders.push(item)
        }
        return allFolders
    }

    function removeFromArray(id) {
        removeFolderFromStorage(id)
        updateRootArr()
    }

    function getSpecificFolder(id) {
        for (let item of rootArray) {
            if (item.getId() === id) {
                return item;
            }
        }
    }

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
    }


    return {
        removeFromArray, getAllFolders, pushFolderToRoot, getSpecificFolder, updateRootArr
    }
}
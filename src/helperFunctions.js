import { getDataFromStorage } from "./storage.js"


// generate a random ID
function getRandomId(){
    return crypto.randomUUID()
}


// Join methods to tasks and folder after retriving from local storage
function joinObjectAndMethods(obj, methods) {
    Object.assign(obj, methods())
}



export {getRandomId, joinObjectAndMethods}
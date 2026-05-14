import { getDataFromStorage } from "./storage.js"


function getRandomId(){
    return crypto.randomUUID()
}

function joinObjectAndMethods(task, functionDefiniton) {
    Object.assign(task, functionDefiniton())
}



export {getRandomId, joinObjectAndMethods}
import { getRandomId } from "./helperFunctions.js";



class Folder {
    constructor(name) {
        this.name = name;
        this.id = getRandomId()
        this.tasks = [];
    }
}

const folderMethods = () => ({

    getName(){
        return this.name
    },
    getId(){
        return this.id
    },
    getTasks(){
        return this.tasks
    }
})

export { Folder, folderMethods }
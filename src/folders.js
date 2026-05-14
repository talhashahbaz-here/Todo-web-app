import { getRandomId } from "./helperFunctions.js";



class Folder {
    constructor(name) {
        this.name = name;
        this.id = getRandomId()
        this.tasks = [];
    }
}

const folderMethods = () => ({

    addTask(obj) {
        this.tasks.push(obj);
    },
    printTasks(){
        let allTasks = []
        for(let item of this.tasks){
            allTasks.push(item)
        }
        return allTasks;
    },
    getName(){
        return this.name
    },

    getId(){
        return this.id
    },
    removeTask(id){
        this.tasks = this.tasks.filter((item) => item.id !== id)
    },

})

export { Folder, folderMethods }
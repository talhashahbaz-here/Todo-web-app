import { getRandomId } from "./helperFunctions.js"




class taskItem {
    constructor(title, description, dueDate, priority) {
        this.id = getRandomId()
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.isCompleted = false
    }
}


const taskItemMethods = () => ({

    getTitle(){
        return this.title
    },
    getDesc(){
        return this.description
    },
    getDueDate(){
        return this.dueDate
    },
    getPriority(){
        return this.priority
    },
    getId(){
        return this.id
    },

    editTitle(newTitle) {
        this.title = newTitle;
    },

    editDesc(newDesc) {
        this.description = newDesc;
    },

    editDue(newDueDate) {
        this.due = newDueDate;
    },

    editPriority(newPriority) {
        this.priority = newPriority
    },

    markComplete() {
        this.isCompleted = true
    },
})



export { taskItem, taskItemMethods }
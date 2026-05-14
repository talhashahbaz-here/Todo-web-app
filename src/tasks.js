import { getRandomId } from "./helperFunctions.js"




class taskItem {
    constructor(title, description, due, priority) {
        this.id = getRandomId()
        this.title = title
        this.description = description
        this.due = due
        this.priority = priority
        this.isCompleted = false
    }
}


const taskItemMethods = () => ({

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

    printDetails() {
        console.log(this.title);
        console.log(this.description);
        console.log(this.due);
        console.log(this.priority);
        console.log(this.isCompleted)

    }
})









export { taskItem, taskItemMethods }
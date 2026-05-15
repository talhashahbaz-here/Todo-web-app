const folderList = document.getElementById('all-folders')




function createLi(folder) {
    const li = document.createElement('li');
    li.classList.add('folder');
    li.id = folder.id;
    li.innerHTML = folder.name;

    return li
}

// Fill the Ul with folder names on start or refresh
function fillFolderUl(rootArr) {
    folderList.replaceChildren()
    const allFolders = rootArr.getAllFolders()
    for (let folder of allFolders) {
        const li = createLi(folder);
        folderList.appendChild(li)
    }
}

// Push or remove folder from folder list in DOM
function updateFolderUl(folder, action) {
    if (action === 'add') {
        const li = createLi(folder);
        folderList.appendChild(li)
    }

    else{
        document.getElementById(`${folder.id}`).remove()
    }
}

function removeTaskItemFromDom(taskId){
    document.getElementById(taskId).remove()
}

// when a folder is selected, fill the content window with all task from the seleted Folder ( not complete yet )
function renderFolderData(id, arr) {
    const folderNameHeading = document.getElementById('current-active-folder');
    const header = document.getElementById('header')
    const tipHeading = document.getElementById('tip-heading')
    const requiredFolder = arr.getSpecificFolder(id)
    folderNameHeading.textContent = requiredFolder.name;

    const taskItemContainer = document.getElementById('task-container')
    taskItemContainer.replaceChildren()
    for (let task of requiredFolder.tasks) {
        const taskItem = createTaskItem(task)
        taskItemContainer.appendChild(taskItem)

    }

    header.classList.remove('hidden')
    tipHeading.classList.add('hidden')
}


function createTaskItem(taskObj) {
    const priorityColors = {
        highPriority: '#ef4444',
        mediumPriority: '#f97316',
        lowPriority: '#F5CB5C'
    };

    // Outer div
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.id = taskObj.getId();
    taskItem.style.borderLeft = `4px solid ${priorityColors[taskObj.getPriority()] ?? '#94a3b8'}`;

    // Task info
    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');

    const title = document.createElement('h2');
    title.textContent = taskObj.getTitle();

    const desc = document.createElement('p');
    desc.textContent = taskObj.getDesc();

    const dueDate = document.createElement('p');
    dueDate.textContent = taskObj.getDueDate();

    taskInfo.append(title, desc, dueDate);

    // Buttons
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('btn');
    completeBtn.classList.add('btn-task-complete');
    completeBtn.textContent = 'Mark Complete';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('btn-task-delete');
    deleteBtn.textContent = 'Delete Task';

    buttonGroup.append(completeBtn, deleteBtn);

    taskItem.append(taskInfo, buttonGroup);

    return taskItem;
}


export {
    fillFolderUl, renderFolderData,
    updateFolderUl, removeTaskItemFromDom
}
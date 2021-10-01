
const addTaskBtn = document.getElementById('add-task-button');
const deskTaskInput = document.getElementById('input-task');
const todosList = document.getElementById('task-list');

let tasks;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <li>
            <input onclick="completeTask(${index})" type="checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task ${task.completed ? 'checked' : ''}">${task.description}</span>
            <button class="delete-btn"></button>
        </li>
    `
}


const fillHtmlList = () => {
    todosList.innerHTML = "";
    if(tasks.length > 0) {
        tasks.forEach((item, index) => {
            todosList.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.task');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElems[index].classList.add('checked');

    } else {
        todoItemElems[index].classList.remove('checked');

    }
    updateLocal();
    fillHtmlList();
}

addTaskBtn.addEventListener("click", () => {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = "";
})

const deleteTask = index => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}
document.getElementById('addTaskButton').addEventListener('click', addTask);

let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;

    if (taskText === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span contenteditable="true" onBlur="editTask(${task.id}, this.innerText)">${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="toggleCompletion(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        if (task.completed) {
            li.querySelector('span').style.textDecoration = 'line-through';
        }
        taskList.appendChild(li);
    });
}

function editTask(id, newText) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.text = newText;
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleCompletion(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}
  
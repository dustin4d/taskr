// Initialization
window.onload = () => {
    loadTasks();    // Load data from browser storage
    renderTasks();  // Render DOM elements for any data loaded
    attachSubmitListener(); // Attach eventListener on input element
}

let currentTasks = [];

// Globally Scoped Selectors
const input = document.querySelector('.editbox');
const table = document.querySelector(".task-list");
let currentEditIndex = null;    // For tracking if you're editing a task or not

const addTask = (description, edit = false) => {
    const Task = {
        id: currentTasks.length + 1,
        description: description,
    };

    if (currentEditIndex !== null) {
        currentTasks.splice(currentEditIndex, 0, Task); // Add the task back to where it was
        currentEditIndex = null;    // Reset the edit indicator back to null
    } else {
        currentTasks.unshift(Task);
    } 
    saveTasks();
};

const editTask = (taskId) => {
    const task = currentTasks.find(t => t.id === taskId); // Find the task from the array that matches current task's ID
    const taskIndex = currentTasks.findIndex(t => t.id === taskId);
    if (task) { // and if that task exists,
        currentEditIndex = taskIndex; // Turn on edit mode,
        currentTasks.splice(taskIndex, 1); // Remove it from the array
        input.value = task.description; // Pre-populate the input box with the task's data
        input.focus(); // focus the element
        input.style.borderColor = '#ffff74'; // and make it look yellow. Because yellow means edit.
        renderTasks();
    };
};

const deleteTask = (taskId) => {
    const index = currentTasks.findIndex(t => t.id === taskId); // Iterate through and find index that matches taskId,
    console.log(taskId);
    if (index > -1) { // if successful,
        currentTasks.splice(index, 1); // Start at `index` and delete that position
        saveTasks(); // Save the changes to browser storage
        renderTasks();
    }
}

const saveTasks = () => {
    // Create a storage called `tasks`, and input stringified `currentTasks` in it.
    localStorage.setItem('tasks', JSON.stringify(currentTasks));
};

const loadTasks = () => {
    // Load the data in localStorage, convert it back to what it was originally if data is present.
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        currentTasks = storedTasks; 
    }
};

const attachSubmitListener = () => {
    document.getElementById('createTask').addEventListener('submit', submitListener);
};

const submitListener = (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (text) {
        if (currentEditIndex !== null) {
            addTask(text, true);
        } else {
            addTask(text);
        }
        renderTasks();
        input.value = null;
    };
};

const renderTasks = () => {
    table.innerHTML = "";
    currentTasks.forEach(task => {
        // Create the tr and td elements
        const newTask = document.createElement('tr');
        const newTaskCell = document.createElement('td');
        newTaskCell.classList.add('newTask');

        // Insert data
        newTaskCell.textContent = task.description;

        // Create cell for edit button
        const btnEditTask = document.createElement('td');
        btnEditTask.innerHTML = '<i class="fa-solid fa-pen-to-square btn-TaskEdit"></i>';
        btnEditTask.addEventListener('click', () => {
            editTask(task.id);
        });

        // Create cell for delete button
        const btnDeleteTask = document.createElement('td');
        btnDeleteTask.innerHTML = '<i class="fa-solid fa-trash btn-TaskDelete"></i>';
        btnDeleteTask.addEventListener('click', () => {
            deleteTask(task.id);
        });

        // Iterate through array and append each array item to the `<tr>`
        [newTaskCell, btnEditTask, btnDeleteTask].forEach(cell => newTask.appendChild(cell));

        // Append the new `<tr>` to the table :)
        table.appendChild(newTask);
    })
};
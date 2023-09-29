// Initialization
window.onload = () => {
    App();
}

// Entry point
const App = () => {
    console.log("Initializing app...")
    createTask();
}

const currentTasks = [];

//// Globally Scoped Selectors
// Select the `<input>` element
const input = document.querySelector('.editbox');
// Select <table> element
const table = document.querySelector(".task-list");

const addTask = (description) => {
    // Create new Task object
    const Task = {
        id: currentTasks.length + 1,
        description: description,
    }
    // Push this new task to the `currentTasks` array
    currentTasks.push(Task);
}

const attachEventListeners = () => {
    document.getElementById('createTask').addEventListener('submit', function(event){
    /* Prevent form from doing default behavior using an anonymous function that will use
    * the event's object as a parameter for the `.addEventListener()` method.
    */
    event.preventDefault();

        const text = input.value;
        if (text) {
            addTask(text);
            // renderTasks();
            input.value = null; // Clear the input field
            }
    })
}

const renderTasks = () => {
    table.innerHTML = "";
    currentTasks.forEach(task => {
        // Create the table elements
        const newTask = document.createElement('tr');
        const newTaskCell = document.createElement('td');
        newTaskCell.classList.add('newTask');

        // Insert data
        newTaskCell.textContent = task.description;

        // Create cell for edit button
        const btnEditTask = document.createElement('td');
        btnEditTask.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

        // Create cell for delete button
        const btnDeleteTask = document.createElement('td');
        btnDeleteTask.innerHTML = `<i class="fa-solid fa-trash"></i>`

        // Iterate through array and append each array item to the `<tr>`
        [newTaskCell, newTaskEdit, newTaskDelete].forEach(cell => newTask.appendChild(cell));

        // Append the new `<tr>` to the table :)
        table.appendChild(newTask);
    })
}

// Create Task
const createTask = () => {
       
        // Create new elements for the new task
        const newTask = document.createElement('tr');
        const newTaskCell = document.createElement('td')

        newTaskCell.textContent = text;
        newTaskCell.classList.add('newTask')

        // Create new Edit Button for the new task
        const newTaskEdit = document.createElement('td')
        newTaskEdit.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        newTaskEdit.classList.add('btn-TaskEdit');

        // Create new Delete Button for the new task
        const newTaskDelete = document.createElement('td')
        newTaskDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        newTaskDelete.classList.add('btn-TaskDelete');
    
        // Add all the new task data to an array, then iterate through it
        const rowData = [newTaskCell, newTaskEdit, newTaskDelete];
        for (let i = 0; i < rowData.length; i++) {
            newTask.appendChild(rowData[i]);
        }

        // Add the task cells to the row element
        table.appendChild(newTask);

        // Add eventListeners to the buttons
        btnEditTask();

        // Clear the `<input>` field after the new cell's been created and appended.
        input.value = null;
    }

    // Edit Task eventListener
const btnEditTask = () =>{
    document.querySelector('.btn-TaskEdit').addEventListener('click', () => {
        // Remove task from table
        // Selected task value goes back to the edit box
        // Put user focus back on the edit box
        // Run the eventListener for adding a task
    })
}
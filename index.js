// Initialization
window.onload = () => {
    App();
}

// Entry point
const App = () => {
    attachSubmitListener();
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
        id: currentTasks.length + 1, // ID starts at 1 instead of 0.
        description: description,    // `description` = `text` from the input element

        delete: () => {
            const index = currentTasks.findIndex(t => t.id === Task.id); // Run function for each array element, check against Task.id
            if (index > -1) { // If the array isn't empty basically
            currentTasks.splice(index, 1); // Start splice at the Task's index, `1` selects it
            renderTasks(); // Update the list of tasks
            }
        },
        edit: () => {  // May need to change to editMode
            console.log(Task.description); 
            // put focus back on editbox
            // pressing Enter will add that Task back to the `index` of currentTasks
            input.value = Task.description;
            input.style.borderColor = '#ffff74';
        
            const index = currentTasks.findIndex(t => t.id === Task.id);
            if (index > -1) {
            currentTasks.splice(index, 1);
            renderTasks();
           }
           input.focus();

           const editSubmitListener = (event) => {
            event.preventDefault();
            const newText = input.value.trim();
            if (newText) {
                Task.description = newText;
                currentTasks.splice(index, 0, Task);
                renderTasks();
                input.value = null;
                input.style.borderColor = '';

                document.getElementById('createTask').removeEventListener('submit', editSubmitListener);
                attachSubmitListener();
                }
           }
            document.getElementById('createTask').removeEventListener('submit', submitListener);
            document.getElementById('createTask').addEventListener('submit', editSubmitListener);
        },
    };
   
    
    // Then add the newly created Task to the array
    currentTasks.unshift(Task);
}

const attachSubmitListener = () => {
    document.getElementById('createTask').addEventListener('submit', submitListener);
}

const submitListener = (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (text) {
        addTask(text);
        renderTasks();
        input.value = null;
    }
}

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
        btnEditTask.addEventListener('click', () => task.edit());

        // Create cell for delete button
        const btnDeleteTask = document.createElement('td');
        btnDeleteTask.innerHTML = '<i class="fa-solid fa-trash btn-TaskDelete"></i>';
        btnDeleteTask.addEventListener('click', () => task.delete());

        // Iterate through array and append each array item to the `<tr>`
        [newTaskCell, btnEditTask, btnDeleteTask].forEach(cell => newTask.appendChild(cell));

        // Append the new `<tr>` to the table :)
        table.appendChild(newTask);
    })
}
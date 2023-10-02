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
        
            const index = currentTasks.findIndex(t => t.id === Task.id);
            if (index > -1) {
            currentTasks.splice(index, 1);
            renderTasks();
           }
           input.focus();

           // Might need to addEventListener specifically for editMode, so replacing a note is easily doable.
           // Seems to be the easiest way without writing Task.replace() method
        },
    }
    
    // Then add the newly created Task to the array
    currentTasks.unshift(Task);
}

const attachSubmitListener = () => {
    // Submit eventListener
    document.getElementById('createTask').addEventListener('submit', function(event){
    /* Prevent form from doing default behavior using an anonymous function that will use
    * the event's object as a parameter for the `.addEventListener()` method. */
    event.preventDefault();

    const text = input.value.trim(); // Disallows only spaces
    if (text) {
        addTask(text);
        renderTasks();
        input.value = null; // Clear the input field
        }
    })
}

const attachDeleteListener = () => {
    //document.querySelector('btn-TaskDelete').addEventListener('click', this.delete());
    console.log("Delete");
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
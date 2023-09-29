document.getElementById('createTask').addEventListener('submit', function(event){
    /* Prevent form from doing default behavior using an anonymous function that will use
     * the event's object as a parameter for the `.addEventListener()` method.
     */
    event.preventDefault();

    // Get the value from the <input> element
    const text = document.querySelector(".editbox").value;

    // Select <table> element
    const table = document.querySelector(".task-list");

    // Create new elements for the new task
    const newTask = document.createElement('tr');
    
    const newTaskCell = document.createElement('td')
    newTaskCell.textContent = text;

    // Create new Edit Button for the new task
    const newTaskEdit = document.createElement('td')
    newTaskEdit.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i>`;

    // Create new Delete Button for the new task
    const newTaskDelete = document.createElement('td')
    newTaskDelete.innerHTML = `<i class="fa-solid fa-trash" style="color: #ffffff;"></i>`;
  
    // Add all the new task data to an array, then iterate through it
    const rowData = [newTaskCell, newTaskEdit, newTaskDelete];
    for (let i = 0; i < rowData.length; i++) {
        newTask.appendChild(rowData[i]);
    }

    // Add the task cells to the row element
    table.appendChild(newTask);

})
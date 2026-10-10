const todoList = document.querySelector('#todo-list');
const addTaskBtn = document.querySelector('#add-task-btn');
const newTodoInput = document.querySelector('#new-todo-input');

function addTodo(task, completed = false) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (completed) {
        li.classList.add('completed');
    }

    li.innerHTML = `
        <input type="checkbox" ${completed ? 'checked' : ''} />
        <label>${task}</label>
        <div class="todo-actions">
            <div class="icon edit-icon" title="Edit Task">
                <img src="edit-icon.png" alt="edit" />
            </div>
            <div class="icon delete-icon" title="Delete Task">
                <img src="delete-icon.png" alt="delete" />
            </div>
        </div>
    `;

    todoList.append(li);
}

function handleAddTaskBtn() {
    const text = newTodoInput.value.trim();
    if (text !== '') {
        addTodo(text);
        newTodoInput.value = '';
    }
}

function toggleTodoCompleted(target) {
    const item = target.closest('.todo-item');
    item.classList.toggle('completed');
}

function deleteTodoItem(target) {
    const item = target.closest('.todo-item');
    item.remove();
}

function editTodoItem(target) {
    const item = target.closest('.todo-item');
    const label = item.querySelector('label');
    const oldText = label.innerText;
    
    const newText = prompt('Edit your task:', oldText);
    if (newText !== null && newText.trim() !== '') {
        label.innerText = newText.trim();
    }
}

function handleTodoListClick(event) {
    const target = event.target;
    
    // Checkbox clicked (Complete/Uncomplete)
    if (target.type === 'checkbox') {
        toggleTodoCompleted(target);
    }
    // Delete icon clicked
    else if (target.closest('.delete-icon')) {
        deleteTodoItem(target);
    }
    // Edit icon clicked
    else if (target.closest('.edit-icon')) {
        editTodoItem(target);
    }
}

// Event Listeners
addTaskBtn.addEventListener('click', handleAddTaskBtn);

newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleAddTaskBtn();
    }
});

todoList.addEventListener('click', handleTodoListClick);

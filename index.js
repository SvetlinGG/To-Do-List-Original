document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const tasksList = document.getElementById('tasks-list');
    const completedList = document.getElementById('completed-list');
    
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    
    // Render initial tasks
    renderTasks();
    renderCompletedTasks();
    
    // Add task event
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push(taskText);
            saveTasks();
            renderTasks();
            taskInput.value = '';
            taskInput.focus();
        }
    }
    
    // Function to mark a task as complete
    function completeTask(index) {
        const task = tasks[index];
        completedTasks.push(task);
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
        renderCompletedTasks();
    }
    
    // Function to restore a completed task
    function restoreTask(index) {
        const task = completedTasks[index];
        tasks.push(task);
        completedTasks.splice(index, 1);
        saveTasks();
        renderTasks();
        renderCompletedTasks();
    }
    
    // Function to delete a task
    function deleteTask(index, isCompleted) {
        if (isCompleted) {
            completedTasks.splice(index, 1);
        } else {
            tasks.splice(index, 1);
        }
        saveTasks();
        if (isCompleted) {
            renderCompletedTasks();
        } else {
            renderTasks();
        }
    }
    
    // Function to render active tasks
    function renderTasks() {
        tasksList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            
            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task;
            
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'task-buttons';
            
            const completeBtn = document.createElement('button');
            completeBtn.className = 'complete-btn';
            completeBtn.textContent = 'Complete';
            completeBtn.addEventListener('click', () => completeTask(index));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(index, false));
            
            buttonsDiv.appendChild(completeBtn);
            buttonsDiv.appendChild(deleteBtn);
            
            li.appendChild(taskText);
            li.appendChild(buttonsDiv);
            
            tasksList.appendChild(li);
        });
    }
    
    // Function to render completed tasks
    function renderCompletedTasks() {
        completedList.innerHTML = '';
        completedTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            
            const taskText = document.createElement('span');
            taskText.className = 'task-text completed-task';
            taskText.textContent = task;
            
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'task-buttons';
            
            const restoreBtn = document.createElement('button');
            restoreBtn.className = 'restore-btn';
            restoreBtn.textContent = 'Restore';
            restoreBtn.addEventListener('click', () => restoreTask(index));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(index, true));
            
            buttonsDiv.appendChild(restoreBtn);
            buttonsDiv.appendChild(deleteBtn);
            
            li.appendChild(taskText);
            li.appendChild(buttonsDiv);
            
            completedList.appendChild(li);
        });
    }
    
    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
});
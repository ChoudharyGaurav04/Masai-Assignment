const apiURL = 'https://mockapi.io/tasks'; // Replace with your actual MockAPI endpoint

const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const newTitle = document.getElementById('newTitle');
const newStatus = document.getElementById('newStatus');
const messageDiv = document.getElementById('message');

// Fetch and display tasks
async function fetchTasks() {
  taskList.innerHTML = 'Loading tasks...';
  try {
    const response = await fetch(apiURL);
    const tasks = await response.json();

    if (tasks.length === 0) {
      taskList.innerHTML = '<p>No tasks found.</p>';
      return;
    }

    taskList.innerHTML = '';
    tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.className = `task ${task.status.toLowerCase()}`;
      taskDiv.innerHTML = `
        <div>
          <strong>${task.title}</strong> - ${task.status}
        </div>
        <div class="task-actions">
          <button onclick="editTask('${task.id}', '${task.title}', '${task.status}')">Edit</button>
          <button onclick="deleteTask('${task.id}')">Delete</button>
        </div>
      `;
      taskList.appendChild(taskDiv);
    });
  } catch (error) {
    console.error(error);
    taskList.innerHTML = '<p class="error">Failed to load tasks.</p>';
  }
}

// Add new task
taskForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const title = newTitle.value.trim();
  const status = newStatus.value;

  if (!title) {
    showMessage('Please enter a task title.', 'error');
    return;
  }

  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, status })
    });

    if (!response.ok) {
      throw new Error('Failed to add task.');
    }

    showMessage('Task added successfully!', 'success');
    taskForm.reset();
    fetchTasks();
  } catch (error) {
    console.error(error);
    showMessage(error.message || 'Something went wrong!', 'error');
  }
});

// Edit task
function editTask(id, currentTitle, currentStatus) {
  const taskDiv = document.querySelector(`.task-actions button[onclick*="${id}"]`).closest('.task');
  taskDiv.innerHTML = `
    <div>
      <input type="text" id="editTitle" value="${currentTitle}" />
      <select id="editStatus">
        <option value="Pending" ${currentStatus === 'Pending' ? 'selected' : ''}>Pending</option>
        <option value="Completed" ${currentStatus === 'Completed' ? 'selected' : ''}>Completed</option>
      </select>
    </div>
    <div class="task-actions">
      <button onclick="saveTask('${id}')">Save</button>
      <button onclick="fetchTasks()">Cancel</button>
    </div>
  `;
}

// Save edited task
async function saveTask(id) {
  const editTitle = document.getElementById('editTitle').value.trim();
  const editStatus = document.getElementById('editStatus').value;

  if (!editTitle) {
    showMessage('Please enter a task title.', 'error');
    return;
  }

  try {
    const response = await fetch(`${apiURL}/${id}`, {
      method: 'PUT', // or 'PATCH' if you prefer partial updates
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, status: editStatus })
    });

    if (!response.ok) {
      throw new Error('Failed to update task.');
    }

    showMessage('Task updated successfully!', 'success');
    fetchTasks();
  } catch (error) {
    console.error(error);
    showMessage(error.message || 'Something went wrong!', 'error');
  }
}

// Delete task
async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }

  try {
    const response = await fetch(`${apiURL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete task.');
    }

    showMessage('Task deleted successfully!', 'success');
    fetchTasks();
  } catch (error) {
    console.error(error);
    showMessage(error.message || 'Something went wrong!', 'error');
  }
}

// Show message
function showMessage(message, type) {
  messageDiv.textContent = message;
  messageDiv.className = type;
  setTimeout(() => {
    messageDiv.textContent = '';
    messageDiv.className = '';
  }, 3000);
}

// Initial fetch
fetchTasks();

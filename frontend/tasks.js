const API = "http://localhost:5001/api";
const token = localStorage.getItem("token");

if (!token) {
  location.href = "login.html";
}

let editingTaskId = null; // Track if we are editing a task

async function loadTasks() {
  try {
    const res = await fetch(`${API}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('token');
        location.href = 'login.html';
        return;
      }
      throw new Error("Failed to load tasks");
    }

    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    console.error(err);
  }
}

function renderTasks(tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "<p style='text-align:center; color:#777;'>No tasks found. Create one above!</p>";
    return;
  }

  tasks.forEach(t => {
    // Escape title and description to prevent XSS and HTML breaking
    const titleEscaped = t.title.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    const descEscaped = (t.description || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');

    const statusClass = t.status === 'Completed' ? 'status-completed' : 'status-pending';
    const statusText = t.status === 'Completed' ? 'Undo' : 'Done';
    const statusTitle = t.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed';

    taskList.innerHTML += `
        <li>
            <div class="task-info">
                <span class="task-title">${t.title} <span class="status-badge ${statusClass}">${t.status}</span></span>
                <span class="task-desc">${t.description || ''}</span>
            </div>
            <div class="task-actions">
                <button class="btn-sm btn-status" title="${statusTitle}" onclick="toggleStatus('${t._id}', '${t.status}')">${statusText}</button>
                <button class="btn-sm btn-edit" onclick="startEdit('${t._id}', '${titleEscaped}', '${descEscaped}')">Edit</button>
                <button class="btn-sm btn-delete" onclick="deleteTask('${t._id}')">Delete</button>
            </div>
        </li>`;
  });
}

// Handle Add or Update
async function handleTaskSubmit() {
  const titleInput = document.getElementById('title');
  const descInput = document.getElementById('description');

  if (!titleInput.value.trim()) {
    alert("Please enter a title");
    return;
  }

  if (editingTaskId) {
    await updateTask(editingTaskId, titleInput.value, descInput.value);
  } else {
    await addTask(titleInput.value, descInput.value);
  }
}

async function addTask(title, description) {
  try {
    const res = await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, description })
    });

    if (res.ok) {
      resetForm();
      loadTasks();
    } else {
      alert("Failed to add task");
    }
  } catch (err) {
    console.error(err);
    alert("Error adding task");
  }
}

async function updateTask(id, title, description) {
  try {
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, description })
    });

    if (res.ok) {
      resetForm();
      loadTasks();
      alert("Task Updated");
    } else {
      alert("Failed to update task");
    }
  } catch (err) {
    console.error(err);
    alert("Error updating task");
  }
}

async function toggleStatus(id, currentStatus) {
  const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
  try {
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (res.ok) {
      loadTasks();
    } else {
      alert("Failed to update status");
    }
  } catch (err) {
    console.error(err);
  }
}

async function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) return;

  try {
    const res = await fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      loadTasks();
      // If we were editing this task, cancel edit mode
      if (editingTaskId === id) resetForm();
    } else {
      alert("Failed to delete task");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting task");
  }
}

function startEdit(id, title, desc) {
  editingTaskId = id;
  document.getElementById('title').value = title;
  document.getElementById('description').value = desc === 'undefined' ? '' : desc;

  const btn = document.getElementById('addBtn');
  btn.textContent = "Update Task";
  btn.style.backgroundColor = "#2196F3"; // Blue for update

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
  editingTaskId = null;
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  const btn = document.getElementById('addBtn');
  btn.textContent = "Add Task";
  btn.style.backgroundColor = ""; // Reset to default (green)
}

loadTasks();
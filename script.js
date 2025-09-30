const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Load saved todos
document.addEventListener("DOMContentLoaded", loadTodos);

// Add button click
addBtn.addEventListener("click", addTodo);

// Add task
function addTodo() {
  const task = input.value.trim();
  if (task === "") return;

  const todoItem = createTodoItem(task);
  todoList.appendChild(todoItem);
  saveTodo(task);

  input.value = "";
}

// Create DOM for a task
function createTodoItem(task, completed = false) {
  const li = document.createElement("li");
  li.className = "todo-item";
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = task;

  const btnContainer = document.createElement("div");
  btnContainer.className = "todo-buttons";

  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = "✔";
  completeBtn.className = "complete-btn";
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTodo(task, li.classList.contains("completed"));
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    todoList.removeChild(li);
    deleteTodo(task);
  });

  btnContainer.appendChild(completeBtn);
  btnContainer.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btnContainer);

  return li;
}

// Local Storage Functions
function saveTodo(task) {
  const todos = getTodos();
  todos.push({ task, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(task) {
  let todos = getTodos();
  todos = todos.filter(t => t.task !== task);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodo(task, completed) {
  let todos = getTodos();
  todos = todos.map(t =>
    t.task === task ? { task: t.task, completed } : t
  );
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function loadTodos() {
  const todos = getTodos();
  todos.forEach(todo => {
    const item = createTodoItem(todo.task, todo.completed);
    todoList.appendChild(item);
  });
}
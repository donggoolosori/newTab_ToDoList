const todoList = document.querySelector(".js-todoList");
const todoForm = document.querySelector(".js-todoForm");
const todoButton = document.querySelector(".js-todoButton");
const todoInput = document.querySelector(".js-todoInput");

let todos;
let checked;

const TODOS_LS = "todos";
const CHECKED_LS = "checked";

function paintToDo(todo) {
  // create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("js-todo");
  // create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("js-todoItem");
  todoDiv.appendChild(newTodo);

  // check if checked
  checked = getLocalChecked();
  const index = getIndexOfTodos(todo);
  if (checked[index] === 1) {
    todoDiv.classList.add("checked");
  }

  //check button
  const checkButton = document.createElement("button");
  checkButton.innerHTML = "<i class='fas fa-check'></i>";
  checkButton.classList.add("js-checkButton");
  todoDiv.appendChild(checkButton);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class = 'fas fa-trash'></i>";
  trashButton.classList.add("js-trashButton");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
}
function loadToDos() {
  todos = getLocalToDos();
  if (todos !== null) {
    todos.forEach(function (todo) {
      paintToDo(todo);
    });
  }
}
function showToDoForm() {
  todoForm.classList.add("showing");
}
function getLocalToDos() {
  todos = JSON.parse(localStorage.getItem(TODOS_LS));
  if (todos === null) {
    return [];
  }
  return todos;
}
function saveTodo(todo) {
  todos = getLocalToDos();
  todos.push(todo);
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}
function getLocalChecked() {
  checked = JSON.parse(localStorage.getItem(CHECKED_LS));
  if (checked === null) {
    return [];
  }
  return checked;
}
function saveChecked(todo) {
  checked = getLocalChecked();
  checked.push(0);
  localStorage.setItem(CHECKED_LS, JSON.stringify(checked));
}
function addTodo(event) {
  event.preventDefault();
  const todo = todoInput.value;
  if (todo == "") {
    alert("Write a todo!");
  } else {
    paintToDo(todo);
    saveTodo(todo);
    saveChecked(todo);
    todoInput.value = "";
  }
}
function getIndexOfTodos(todo) {
  todos = getLocalToDos();
  const index = todos.indexOf(todo);
  return index;
}
function removeLocalTodo(todo) {
  const index = getIndexOfTodos(todo);
  todos.splice(index, 1);
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}
function removeLocalChecked(todo) {
  checked = getLocalChecked();
  const index = getIndexOfTodos(todo);
  checked.splice(index, 1);
  localStorage.setItem(CHECKED_LS, JSON.stringify(checked));
}
function checkCheckedLs(todo) {
  const index = getIndexOfTodos(todo);
  checked = getLocalChecked();
  checked[index] = 1 - checked[index];
  localStorage.setItem(CHECKED_LS, JSON.stringify(checked));
}
function deleteCheck(event) {
  const item = event.target;
  //delete
  if (item.classList[0] === "js-trashButton") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeLocalTodo(todo.children[0].innerText);
    removeLocalChecked(todo.children[0].innerText);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //check
  if (item.classList[0] === "js-checkButton") {
    const todo = item.parentElement;
    todo.classList.toggle("checked");
    checkCheckedLs(todo.children[0].innerText);
  }
}
function init() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser !== null) {
    showToDoForm();
    loadToDos();
  }
  todoButton.addEventListener("click", addTodo);
  todoList.addEventListener("click", deleteCheck);
}

init();

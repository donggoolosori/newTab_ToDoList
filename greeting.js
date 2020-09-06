const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");
const USER_LS = "currentUser";

function getTimeGreeting() {
  const date = new Date();
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    return "Morning";
  } else if (hour >= 12 && hour < 17) {
    return "Afternoon";
  } else {
    return "Evening";
  }
}
function showGreeting(currentUser) {
  const hi = getTimeGreeting();
  greeting.classList.add("showing");
  greeting.innerText = `Good ${hi} ${currentUser}!`;
  form.classList.add("hide");
}

function loadUserName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser !== null) {
    showGreeting(currentUser);
  }
}
function saveUserName() {
  localStorage.setItem(USER_LS, input.value);
}
// 이름 입력시 todo form 을 보여주는 함수
function showToDoForm_inputName() {
  const todoForm = document.querySelector(".js-todoForm");
  todoForm.classList.add("showing");
}
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  saveUserName();
  showGreeting(currentValue);
  showToDoForm_inputName();
  loadToDos();
}
function init() {
  loadUserName();
  form.addEventListener("submit", handleSubmit);
}

init();

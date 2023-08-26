"use strict";

let todoList = [];

const addTodoBtn = document.querySelectorAll(".card__addTodoButton")[0];
const inputTodo = document.querySelectorAll(".card__todoText")[0];
const content = document.querySelectorAll(".content")[0];
const problemBtn1 = document.querySelector(".problem-btn1");
const problemBtn2 = document.querySelector(".problem-btn2");
const problemBtn3 = document.querySelector(".problem-btn3");
const problemBtn4 = document.querySelector(".problem-btn4");

let selectEven = false;
let selectOdd = false;

//delete first todo
problemBtn3.addEventListener("click", () => {
  todoList.shift();
  localStorage.setItem("todoList", JSON.stringify(todoList));
  console.log(todoList);
  document.dispatchEvent(changeTodoList);
});

//delete last todo
problemBtn4.addEventListener("click", () => {
  todoList.pop();
  localStorage.setItem("todoList", JSON.stringify(todoList));
  console.log(todoList);
  document.dispatchEvent(changeTodoList);
});

problemBtn1.addEventListener("click", () => {
  selectEven = !selectEven;
  document.dispatchEvent(changeTodoList);
});
problemBtn2.addEventListener("click", () => {
  selectOdd = !selectOdd;
  document.dispatchEvent(changeTodoList);
});

const changeTodoList = new CustomEvent("changeTodoList");

//Getting todo from localStorege before displaying a page
document.addEventListener("DOMContentLoaded", (e) => {
  const getedTodoListFromLS =
    JSON.parse(localStorage.getItem("todoList")) || [];
  todoList = getedTodoListFromLS;
  document.dispatchEvent(changeTodoList);
});

const deleteTodo = (e) => {
  const target = e.target;
  const parentNode = target.parentNode;
  const id = parentNode.dataset.id;

  todoList = todoList.filter((todo) => todo.id !== id);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  document.dispatchEvent(changeTodoList);
};

const completeTodo = (e) => {
  const target = e.target;
  const id = target.parentNode.dataset.id;

  const temp = todoList.filter((todo) => todo.id === id)[0];
  temp.checked = !temp.checked;

  if (!temp.checked) {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    document.dispatchEvent(changeTodoList);
    return;
  }
  todoList = todoList.filter((todo) => todo.id != id);
  todoList.push(temp);

  localStorage.setItem("todoList", JSON.stringify(todoList));
  document.dispatchEvent(changeTodoList);
};

//display todo depending on the array
document.addEventListener("changeTodoList", (e) => {
  content.textContent = "";
  todoList.forEach((todo, index) => {
    const todoCard = document.createElement("div");
    const todoCardText = document.createElement("div");
    const todoDeleteBtn = document.createElement("div");
    const todoCompleteBtn = document.createElement("div");

    todoDeleteBtn.addEventListener("click", deleteTodo);
    todoCompleteBtn.addEventListener("click", completeTodo);

    todoCardText.className = "content__cardText";
    todoCard.className = "content__card";
    todoCard.dataset.id = todo.id;
    todoDeleteBtn.className = "content__deleteBtn";
    todoCompleteBtn.className = "content__completeBtn";

    todoDeleteBtn.innerText = "Удалить";
    todoCardText.innerText = todo.text;
    todoCompleteBtn.innerText = todo.checked ? "Выполнено" : "Невыполнено";

    todoCard.appendChild(todoCardText);
    content.appendChild(todoCard);
    todoCard.appendChild(todoDeleteBtn);
    todoCard.appendChild(todoCompleteBtn);

    if ((index + 1) % 2 == 0 && selectEven) todoCard.classList.toggle("even");
    if ((index + 1) % 2 != 0 && selectOdd) todoCard.classList.toggle("odd");
  });
});

//adding data to array and localStorege
addTodoBtn.addEventListener("click", (e) => {
  const text = inputTodo.value;
  const todo = {
    id: `f${(Math.random() * 1e8).toString(16)}`,
    text: text,
    checked: false,
  };
  todoList.push(todo);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  document.dispatchEvent(changeTodoList);
});

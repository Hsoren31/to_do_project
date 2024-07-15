import "./style.css";
import {
  listDiv,
  listHandler,
  saveAndRender,
  deleteList,
  selectListHandler,
  taskHandler,
  checkedHandler,
  collaspeTaskHandler,
  deleteTask
} from "./lists.js";

saveAndRender();

let newTaskBtn = document.querySelector(".create_new_task");
let newListBtn = document.querySelector(".create_new_list");
let deleteListBtn = document.querySelector(".delete_list");
let openListForm = document.querySelector("[open-list-form]");
let listForm = document.querySelector("[list-form]");
const openTaskForm = document.querySelector("[open-task-form]");
const taskForm = document.querySelector("[task-form]");
const cancelButton = document.querySelectorAll(".cancel");
const taskDiv = document.querySelector(".tasks");
const taskContainer = document.querySelector(".tasks");

newTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  taskHandler();
  taskForm.close();
});

newListBtn.addEventListener("click", (e) => {
  e.preventDefault();
  listHandler();
  listForm.close();
});

deleteListBtn.addEventListener("click", () => {
  deleteList();
});

listDiv.addEventListener("click", (e) => {
  selectListHandler(e);
});

openListForm.addEventListener("click", (e) => {
  e.preventDefault();
  listForm.showModal();
});

openTaskForm.addEventListener("click", (e) => {
  e.preventDefault();
  taskForm.showModal();
});

cancelButton.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    listForm.close();
    taskForm.close();
  });
});

taskDiv.addEventListener("click", (e) => {
  checkedHandler(e);
});

taskContainer.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.matches(".fa-ellipsis")) {
    collaspeTaskHandler(e);
  } else if (e.target.matches(".fa-trash-can")){
    deleteTask(e);
  }
});

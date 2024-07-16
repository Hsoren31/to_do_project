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
  deleteTask,
  editTask
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
const updateTaskBtn = document.querySelector(".update_task");

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
  newTaskBtn.style.display = "block";
  updateTaskBtn.style.display = "none";
});

newTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  taskHandler(e);
  taskForm.close();
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
  } else if (e.target.matches(".fa-pen-to-square")){
    e.preventDefault();
    editTask(e);
    newTaskBtn.style.display = "none";
    updateTaskBtn.style.display = "block";
  }
});

updateTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  taskHandler(e);
  taskForm.close();
});
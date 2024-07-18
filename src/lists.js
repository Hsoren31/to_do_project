import { format } from "date-fns";

const listDiv = document.querySelector("#lists");
const listTemplate = document.querySelector("#list-template");
const listInput = document.querySelector(".new_list");
const taskDiv = document.querySelector(".tasks");
const taskTemplate = document.querySelector("#task-template");
const tasksHeader = document.querySelector("#tasks-header");
const taskForm = document.querySelector('[task-form]');
const tasksNameInput = document.querySelector(".new_task");
const taskDateInput = document.querySelector(".input-date");
const taskPriorityInput = document.querySelector("#priority");
const taskPriorityDefault = document.querySelector("[selected]");
const taskDetailInput = document.querySelector("#task-details");

const LOCAL_STORAGE_LIST_KEY = "tasks.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
const LOCAL_STORAGE_SELECTED_TASK_ID_KEY = "task.selectedTaskId";

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
let selectedTaskId = localStorage.getItem(LOCAL_STORAGE_SELECTED_TASK_ID_KEY);

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function ListObj(name) {
  return { id: Date.now().toString(), name: name, tasks: [] };
}

function TaskObj(name, date, priority, detail) {
  return {
    id: Date.now().toString(),
    complete: false,
    name: name,
    date: date,
    priority: priority,
    detail: detail,
  };
}

function render() {
  clearElement(listDiv);
  renderLists();

  const selectedList = lists.find((list) => list.id === selectedListId);
  if (selectedList == null) {
    taskDiv.style.display = "none";
  } else {
    taskDiv.style.display = "";
    tasksHeader.innerText = selectedList.name;
    //render tasks
    clearElement(taskDiv);
    renderTask(selectedList);
  }
}

function renderLists() {
  lists.forEach((list) => {
    const listElement = document.importNode(listTemplate.content, true);
    const listDivElement = listElement.querySelector("div");
    const listLiElement = listElement.querySelector("li");
    listLiElement.classList.add("list-name");
    listLiElement.dataset.listId = list.id;
    listLiElement.innerText = list.name;
    if (list.id === selectedListId) {
      listDivElement.classList.add("selected-list");
    }
    listDiv.append(listElement);
  });
}

function saveLists() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
  localStorage.setItem(LOCAL_STORAGE_SELECTED_TASK_ID_KEY, selectedTaskId);
}

function saveAndRender() {
  saveLists();
  render();
}

function deleteList(e) {
  const targetedList = (e.target.parentElement.children[0].dataset.listId);
  console.log(targetedList);
  lists = lists.filter((list) => {
    return list.id === targetedList ? false : true;
  });
  tasksHeader.innerText = null;
  saveAndRender();
}

function listHandler() {
  let listName = listInput.value;
  if (listName == null || listName === "") return;
  let list = new ListObj(listName);
  lists.push(list);
  selectedListId = list.id;
  saveAndRender();
  listInput.value = null;
}

function selectListHandler(e) {
  selectedListId = e.target.dataset.listId;

  saveAndRender();
}

function renderTask(selectedList) {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const taskDivElement = taskElement.querySelector(".task");
    taskDivElement.dataset.priority = task.priority;
    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    const dueDateElement = taskElement.querySelector("#due-date");
    dueDateElement.innerText = formatDate(task.date);
    if (task.date == null || task.date === "") {
      dueDateElement.innerText = "No Date Assigned";
    }
    const detailElement = taskElement.querySelector("#detail");
    if (task.detail == null || task.detail === ""){
      detailElement.innerText = "No Details";
    }
    detailElement.innerText = task.detail;
    taskDiv.appendChild(taskElement);
  });
}

function taskHandler(e) {
  let taskTitle = tasksNameInput.value;
    if (taskTitle == null || taskTitle === "") return;
    let taskDate = taskDateInput.value;
    let taskPriority = taskPriorityInput.value;
    let taskDetails = taskDetailInput.value;

  if (e.target.classList[0] === "create_new_task"){
    const task = new TaskObj(taskTitle, taskDate, taskPriority, taskDetails);
    const selectedList = lists.find((list) => list.id === selectedListId);
    selectedList.tasks.push(task);
  } else if (e.target.classList[0] === "update_task"){
    selectedTaskId.name = tasksNameInput.value;
    selectedTaskId.date = taskDateInput.value;
    selectedTaskId.priority = taskPriorityInput.value;
    selectedTaskId.detail = taskDetailInput.value;

  }

  saveAndRender();
  tasksNameInput.value = null;
  taskDateInput.value = null;
  taskPriorityInput.value = taskPriorityDefault.value;
  taskDetailInput.value = null;
}

function checkedHandler(e) {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTaskId = e.target.id;
    const selectedTask = selectedList.tasks.find(
      (task) => task.id === selectedTaskId
    );
    selectedTask.complete = e.target.checked;
    saveLists();
  }
}

function formatDate(date) {
  const dateSeparated = Array.from(date);
  const dateDay = dateSeparated.slice(8).join("");
  const dateMonth = dateSeparated.slice(5, 7).join("");
  const dateYear = dateSeparated.slice(0, 4).join("");

  return format(new Date(dateYear, dateMonth, dateDay), "MM/dd/yyyy");
}

function collaspeTaskHandler(e) {
  const collaspeDiv = e.target.parentElement.nextElementSibling;
  if (collaspeDiv.style.display === 'none') {
    collaspeDiv.style.display = "block";
  } else {
    collaspeDiv.style.display = 'none';
  }
}


function deleteTask(e){
    const selectedTask = e.target.parentElement.firstElementChild.id;
    const selectedList = lists.find((list) => list.id === selectedListId);
    
    selectedList.tasks = selectedList.tasks.filter((task) => {
        return task.id === selectedTask ? false : true;
    });
    saveAndRender();
}

function editTask(e){
  const id = e.target.parentElement.firstElementChild.id;
  const selectedList = lists.find((list) => list.id === selectedListId);
  const selectedTask = selectedList.tasks.find((task) => task.id === id);

  console.log(selectedTask);
  taskForm.showModal();
  
  tasksNameInput.value = selectedTask.name;
  taskDateInput.value = selectedTask.date;
  taskPriorityInput.value = selectedTask.priority;
  taskDetailInput.value = selectedTask.detail;

  selectedTaskId = selectedTask;
}

export {
  listHandler,
  clearElement,
  saveAndRender,
  deleteList,
  selectListHandler,
  taskHandler,
  listDiv,
  checkedHandler,
  collaspeTaskHandler,
  deleteTask,
  editTask
};

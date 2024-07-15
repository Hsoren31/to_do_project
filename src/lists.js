const listDiv = document.querySelector("#lists");
const listInput = document.querySelector(".new_list");
const taskDiv = document.querySelector(".tasks");
const taskTemplate = document.querySelector("#task-template");
const tasksHeader = document.querySelector("#tasks-header");
const tasksNameInput = document.querySelector(".new_task");
const taskDateInput = document.querySelector(".input-date");
const taskPriorityInput = document.querySelector("#priority");
const taskPriorityDefault = document.querySelector("[selected]");
const taskDetailInput = document.querySelector("#task-details");

const LOCAL_STORAGE_LIST_KEY = "tasks.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

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
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
        listElement.classList.add("selected-list");
    }
    listDiv.appendChild(listElement);
  });
}

function saveLists() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function saveAndRender() {
  saveLists();
  render();
}

function deleteList() {
  lists = lists.filter((list) => {
    return list.id === selectedListId ? false : true;
  });
  selectedListId = null;
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
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
  }
  saveAndRender();
}

function renderTask(selectedList) {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    const dueDateElement = taskElement.querySelector("#due-date");
    dueDateElement.innerText = task.date;
    if (task.date == null || task.date === "") {
      dueDateElement.innerText = "No Date Assigned";
    }
    const priorityElement = taskElement.querySelector("#priority");
    priorityElement.innerText = task.priority;
    const detailElement = taskElement.querySelector("#detail");
    detailElement.innerText = task.detail;
    taskDiv.appendChild(taskElement);
  });
}

function taskHandler() {
  let taskTitle = tasksNameInput.value;
  if (taskTitle == null || taskTitle === "") return;
  let taskDate = taskDateInput.value;
  let taskPriority = taskPriorityInput.value;
  let taskDetails = taskDetailInput.value;
  const task = new TaskObj(taskTitle, taskDate, taskPriority, taskDetails);

  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks.push(task);
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
    saveFolders();
  }
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
};

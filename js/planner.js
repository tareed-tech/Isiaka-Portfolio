/* =============================================================
   planner.js — the interactive academic planner
   Covers: arrays, functions, event handling, DOM manipulation,
   dynamic content updates and browser storage.
   ============================================================= */
(function () {
  "use strict";

  var STORAGE_KEY = "cos106.planner.tasks";

  /* Every task lives in this one array. The page is redrawn from it. */
  var tasks = [];
  var activeFilter = "all";

  /* ---------- storage ---------- */

  function starterTasks() {
    return [
      { id: 1, title: "Submit COS 106 term project and hosted link", course: "COS 106", due: "", priority: "High", done: false },
      { id: 2, title: "Finish UI/UX case study write-up", course: "PDU Diploma", due: "", priority: "Medium", done: false },
      { id: 3, title: "Read week 7 lecture notes", course: "COS 106", due: "", priority: "Low", done: true }
    ];
  }

  function loadTasks() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (error) {
      console.warn("Planner storage is unavailable:", error);
    }
    return starterTasks();
  }

  function saveTasks() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.warn("Could not save tasks:", error);
    }
  }

  /* ---------- working with the array ---------- */

  function nextId() {
    return tasks.reduce(function (highest, task) {
      return task.id > highest ? task.id : highest;
    }, 0) + 1;
  }

  function addTask(title, course, due, priority) {
    tasks.unshift({ id: nextId(), title: title, course: course, due: due, priority: priority, done: false });
    saveTasks();
    render();
  }

  function toggleTask(id) {
    tasks.forEach(function (task) {
      if (task.id === id) task.done = !task.done;
    });
    saveTasks();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    saveTasks();
    render();
  }

  function clearCompleted() {
    tasks = tasks.filter(function (task) { return !task.done; });
    saveTasks();
    render();
  }

  function visibleTasks() {
    if (activeFilter === "open") return tasks.filter(function (t) { return !t.done; });
    if (activeFilter === "done") return tasks.filter(function (t) { return t.done; });
    return tasks.slice();
  }

  function formatDate(value) {
    if (!value) return "No due date";
    var date = new Date(value + "T00:00:00");
    if (isNaN(date.getTime())) return "No due date";
    return "Due " + date.toLocaleDateString(undefined, { day: "numeric", month: "short" });
  }

  /* ---------- drawing the list ---------- */

  function makeSpan(className, text) {
    var span = document.createElement("span");
    if (className) span.className = className;
    span.textContent = text;
    return span;
  }

  function buildTask(task) {
    var item = document.createElement("li");
    item.className = "task" + (task.done ? " is-done" : "");
    item.setAttribute("data-priority", task.priority);

    /* Custom round checkbox: a real input with a styled span after it. */
    var check = document.createElement("label");
    check.className = "task__check";
    var input = document.createElement("input");
    input.type = "checkbox";
    input.checked = task.done;
    input.id = "task-" + task.id;
    input.setAttribute("aria-label", "Mark “" + task.title + "” as completed");
    input.addEventListener("change", function () { toggleTask(task.id); });
    check.appendChild(input);
    check.appendChild(makeSpan("", "✓"));

    var body = document.createElement("div");
    var title = document.createElement("p");
    title.className = "task__title";
    title.textContent = task.title;
    var meta = document.createElement("p");
    meta.className = "task__meta";
    meta.appendChild(makeSpan("", task.course || "General"));
    meta.appendChild(makeSpan("", formatDate(task.due)));
    meta.appendChild(makeSpan("pri", task.priority + " priority"));
    body.appendChild(title);
    body.appendChild(meta);

    var remove = document.createElement("button");
    remove.type = "button";
    remove.className = "task__delete";
    remove.textContent = "Delete";
    remove.setAttribute("aria-label", "Delete " + task.title);
    remove.addEventListener("click", function () {
      item.style.transition = "opacity .25s, transform .25s";
      item.style.opacity = "0";
      item.style.transform = "translateX(20px)";
      window.setTimeout(function () { deleteTask(task.id); }, 220);
    });

    item.appendChild(check);
    item.appendChild(body);
    item.appendChild(remove);
    return item;
  }

  function renderStats() {
    var done = tasks.filter(function (t) { return t.done; }).length;
    var total = tasks.length;
    document.getElementById("stat-total").textContent = total;
    document.getElementById("stat-open").textContent = total - done;
    document.getElementById("stat-done").textContent = done;
    var percent = total === 0 ? 0 : Math.round((done / total) * 100);
    document.getElementById("progress-bar").style.width = percent + "%";
    document.getElementById("progress-label").textContent = percent + "% of tasks completed";
  }

  function render() {
    var list = document.getElementById("task-list");
    var empty = document.getElementById("task-empty");
    var rows = visibleTasks();

    list.innerHTML = "";
    rows.forEach(function (task) { list.appendChild(buildTask(task)); });
    empty.hidden = rows.length > 0;
    renderStats();
  }

  /* ---------- wiring up the controls ---------- */

  function setUpForm() {
    var form = document.getElementById("task-form");
    var title = document.getElementById("task-title");
    var error = document.getElementById("task-error");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var value = title.value.trim();

      if (value === "") {
        error.textContent = "Give the task a name before adding it.";
        title.focus();
        return;
      }

      error.textContent = "";
      addTask(
        value,
        document.getElementById("task-course").value.trim(),
        document.getElementById("task-due").value,
        document.getElementById("task-priority").value
      );
      form.reset();
      title.focus();
    });
  }

  function setUpFilters() {
    var buttons = document.querySelectorAll(".filter[data-filter]");

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeFilter = button.getAttribute("data-filter");
        buttons.forEach(function (other) {
          other.classList.toggle("is-active", other === button);
          other.setAttribute("aria-pressed", other === button ? "true" : "false");
        });
        render();
      });
    });

    document.getElementById("clear-done").addEventListener("click", clearCompleted);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("task-list")) return;
    tasks = loadTasks();
    setUpForm();
    setUpFilters();
    render();
  });
})();

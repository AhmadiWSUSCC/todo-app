function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (!task) return;

  const li = document.createElement("li");
  li.textContent = task;

  // Toggle "done" on click
  li.onclick = () => li.classList.toggle("done");

  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.onclick = (e) => {
    e.stopPropagation(); // Prevent triggering li.onclick
    li.remove();
    saveTasks(); // update storage
  };

  li.appendChild(btn);
  document.getElementById("taskList").appendChild(li);
  input.value = "";

  saveTasks(); // save every time you add
}

function saveTasks() {
  const items = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    items.push({
      text: li.childNodes[0].nodeValue.trim(),
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(items));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
  saved.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");

    li.onclick = () => li.classList.toggle("done");

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = (e) => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    };

    li.appendChild(btn);
    document.getElementById("taskList").appendChild(li);
  });
}
window.onload = loadTasks;

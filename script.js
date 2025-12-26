const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

const triggerCelebration = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  const tickBtn = document.createElement("button");
  const span = document.createElement("span");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  span.textContent = taskText;
  span.className = "task-text";
  tickBtn.className = "tick-btn";
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  tickBtn.addEventListener("click", () => {
    if (!li.classList.contains("done")) {
      triggerCelebration();
    }
    li.classList.toggle("done");
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  editBtn.addEventListener("click", () => {
    if (editBtn.textContent === "Edit") {
      const currentVal = span.textContent;
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.className = "edit-input";
      editInput.value = currentVal;

      li.replaceChild(editInput, span);
      editBtn.textContent = "Save";
      editBtn.classList.add("save-btn");
      editInput.focus();
    } else {
      const editInput = li.querySelector(".edit-input");
      if (editInput.value.trim() !== "") {
        span.textContent = editInput.value;
        li.replaceChild(span, editInput);
        editBtn.textContent = "Edit";
        editBtn.classList.remove("save-btn");
      }
    }
  });

  li.append(tickBtn, span, editBtn, deleteBtn);
  todoList.appendChild(li);

  input.value = "";
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
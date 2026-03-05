let tasks = [
  { id: 1, title: "Java Homework", priority: "High", status: "Progress" },
  { id: 2, title: "Database Assignment", priority: "Medium", status: "To Do" },
  { id: 3, title: "JavaScript Project", priority: "Low", status: "Done" },
];

const taskBody = document.getElementById("taskBody");
const inputTask = document.getElementById("inputTask");
const priorityBtns = document.querySelectorAll(".priorityBtn");
const statusBtns = document.querySelectorAll(".statusBtn");
const saveTask = document.getElementById("saveTask");
const dialog = document.getElementById("dialog");

let selectedPriority = "";
let selectedStatus = "";
let edit = false;
let editId = null;

function displayAllTask() {
  taskBody.innerHTML = "";

  tasks.forEach((task) => {
    const data = document.createElement("div");
    data.innerHTML = `
      <div class="bg-white mt-4 p-4 flex justify-around items-center rounded-md" >
        <p class="text-xl w-1/4 text-center font-bold">${task.title}</p>

        <p class="text-xl w-1/4 text-center font-bold" >${task.priority}</p>

        <p class="text-xl w-1/4 text-center font-bold" >${task.status}</p>

        <div class="w-1/4  flex justify-center gap-4">
          <button onclick="editTask(${task.id})">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="blue"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-square-pen-icon lucide-square-pen"
            >
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path
                d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
              />
            </svg>
          </button>
          <button onclick="deleteTask(${task.id})">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-trash-icon lucide-trash"
            >
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
    `;

    taskBody.appendChild(data);
  });
}

priorityBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedPriority = btn.textContent.trim();

    priorityBtns.forEach((b) => {
      b.classList.remove(
        "bg-red-500",
        "bg-yellow-600",
        "bg-green-500",
        "text-white",
      );
    });

    if (selectedPriority === "High") {
      btn.classList.add("bg-red-500", "text-white");
    } else if (selectedPriority === "Medium") {
      btn.classList.add("bg-yellow-600", "text-white");
    } else if (selectedPriority === "Low") {
      btn.classList.add("bg-green-500", "text-white");
    }
  });
});

statusBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedStatus = btn.textContent;

    statusBtns.forEach((b) => b.classList.remove("bg-cyan-400", "text-white"));

    btn.classList.add("bg-cyan-400", "text-white");
  });
});

saveTask.addEventListener("click", () => {
  const title = inputTask.value.trim();

  if (title === "") {
    alert("Please enter a task title");
    return;
  }

  if (selectedPriority === "") {
    selectedPriority = "Medium";
  }

  if (selectedStatus === "") {
    selectedStatus = "Progress";
  }

  if (edit) {
    const task = tasks.find((t) => t.id === editId);

    task.title = title;
    task.priority = selectedPriority;
    task.status = selectedStatus;

    edit = false;
    editId = null;
  } else {
    const newTask = {
      id: tasks.length + 1,
      title: title,
      priority: selectedPriority,
      status: selectedStatus,
    };

    tasks.push(newTask);
  }

  displayAllTask();

  inputTask.value = "";
  selectedPriority = "";
  selectedStatus = "";

  dialog.close();
});

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  displayAllTask();
}
function editTask(id) {
  const task = tasks.find((t) => t.id === id);

  edit = true;
  editId = id;

  inputTask.value = task.title;
  selectedPriority = task.priority;
  selectedStatus = task.status;

  priorityBtns.forEach((btn) => {
    btn.classList.remove(
      "bg-red-500",
      "bg-yellow-400",
      "bg-green-500",
      "text-white",
    );

    if (btn.textContent.trim() === task.priority) {
      if (selectedPriority === "High") {
        btn.classList.add("bg-red-500", "text-white");
      } else if (selectedPriority === "Medium") {
        btn.classList.add("bg-yellow-600", "text-white");
      } else if (selectedPriority === "Low") {
        btn.classList.add("bg-green-500", "text-white");
      }
    }
  });

  statusBtns.forEach((btn) => {
    btn.classList.remove("bg-cyan-400", "text-white");

    if (btn.textContent.trim() === task.status) {
      btn.classList.add("bg-cyan-400", "text-white");
    }
  });

  dialog.showModal();
}

displayAllTask();

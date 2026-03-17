const defaultActivities = [
  { id: 1, name: "HTML Basics", description: "Learn HTML structure", completed: false },
  { id: 2, name: "CSS Styling", description: "Learn CSS basics", completed: false },
  { id: 3, name: "JavaScript Basics", description: "Learn JS fundamentals", completed: false },
  { id: 4, name: "Build Mini Project", description: "Apply your knowledge", completed: false }
];

// Load from localStorage or default
let activities = JSON.parse(localStorage.getItem("activities")) || defaultActivities;

const activityList = document.getElementById("activity-list");

function saveData() {
  localStorage.setItem("activities", JSON.stringify(activities));
}

function toggleStatus(id) {
  activities = activities.map(activity => {
    if (activity.id === id) {
      activity.completed = !activity.completed;
    }
    return activity;
  });

  saveData();
  renderActivities();
}

function renderActivities() {
  activityList.innerHTML = "";

  activities.forEach(activity => {
    const div = document.createElement("div");
    div.className = "activity";

    div.innerHTML = `
      <h3>${activity.name}</h3>
      <p>${activity.description}</p>
      <p class="status ${activity.completed ? "completed" : "pending"}">
        ${activity.completed ? "Completed" : "Pending"}
      </p>
      <button onclick="toggleStatus(${activity.id})">
        ${activity.completed ? "Undo" : "Mark Completed"}
      </button>
    `;

    activityList.appendChild(div);
  });

  updateProgress();
}

function updateProgress() {
  const completed = activities.filter(a => a.completed).length;
  const total = activities.length;

  document.getElementById("progress-text").innerText =
    `${completed} out of ${total} activities completed`;

  const percent = (completed / total) * 100;
  document.getElementById("progress-fill").style.width = percent + "%";
}

renderActivities();

// Array to store all students
let students = [];

// Get elements from the page
const form = document.querySelector(".add-student-form");
const studentNameInput = document.getElementById("student-name");
const matriculationInput = document.getElementById("matriculation-number");
const studentsList = document.getElementById("students-list");
const currentDateSpan = document.getElementById("current-date");
const clearStudentsBtn = document.getElementById("clear-students-btn");

// Set current date
function setCurrentDate() {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  currentDateSpan.textContent = today.toLocaleDateString("en-US", options);
}

// Load students from localStorage when page loads
function loadStudents() {
  const savedStudents = localStorage.getItem("attendly-students");
  if (savedStudents) {
    students = JSON.parse(savedStudents);
    renderStudents();
  }
}

// Save students to localStorage
function saveStudents() {
  localStorage.setItem("attendly-students", JSON.stringify(students));
}

// Add a new student
function addStudent(name, matriculationNumber) {
  // Remove existing student with the same matriculation number
  students = students.filter(
    (s) => s.matriculationNumber !== matriculationNumber
  );

  // Add the new student
  const newStudent = {
    name: name,
    matriculationNumber: matriculationNumber,
    present: false, // Default to absent
  };

  students.push(newStudent);
  saveStudents();
  renderStudents();
}

// Toggle attendance status
function toggleAttendance(matriculationNumber) {
  const student = students.find(
    (s) => s.matriculationNumber === matriculationNumber
  );
  if (student) {
    student.present = !student.present;
    saveStudents();
    renderStudents();
  }
}

// Clear all students
function clearAllStudents() {
  if (students.length === 0) {
    return;
  }

  if (confirm("Are you sure you want to clear all students?")) {
    students = [];
    saveStudents();
    renderStudents();
  }
}

// Render the list of students
function renderStudents() {
  studentsList.innerHTML = "";

  if (students.length === 0) {
    studentsList.innerHTML =
      '<li style="color: #999; text-align: center; padding: 20px;">No students added yet</li>';
    return;
  }

  students.forEach((student) => {
    const listItem = document.createElement("li");

    const studentInfo = document.createElement("div");
    studentInfo.style.display = "flex";
    studentInfo.style.justifyContent = "space-between";
    studentInfo.style.alignItems = "center";

    const studentDetails = document.createElement("div");
    studentDetails.innerHTML = `
      <strong>${student.name}</strong><br>
      <span style="color: #7f8c8d; font-size: 0.9rem;">${student.matriculationNumber}</span>
    `;

    const statusButton = document.createElement("button");
    statusButton.textContent = student.present ? "Present" : "Absent";
    statusButton.style.backgroundColor = student.present
      ? "#27ae60"
      : "#e74c3c";
    statusButton.style.padding = "8px 16px";
    statusButton.style.fontSize = "0.9rem";

    statusButton.addEventListener("click", () => {
      toggleAttendance(student.matriculationNumber);
    });

    studentInfo.appendChild(studentDetails);
    studentInfo.appendChild(statusButton);
    listItem.appendChild(studentInfo);
    studentsList.appendChild(listItem);
  });
}

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  const name = studentNameInput.value.trim();
  const matriculationNumber = matriculationInput.value.trim();

  // Simple validation
  if (name === "" || matriculationNumber === "") {
    alert("Please fill in both name and matriculation number");
    return;
  }

  // Add the student
  addStudent(name, matriculationNumber);

  // Clear the form
  studentNameInput.value = "";
  matriculationInput.value = "";
  studentNameInput.focus();
});

// Handle clear students button click
clearStudentsBtn.addEventListener("click", clearAllStudents);

// Initialize the app when page loads
setCurrentDate();
loadStudents();

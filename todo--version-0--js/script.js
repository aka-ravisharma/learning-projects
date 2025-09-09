const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById('myButton');
const taskCount = document.getElementById("task-count");
const row_btn = document.getElementById("row")
const auto_del = document.getElementById("auto-delete")
const add_svg = document.getElementById("add");


const done_icon = `<svg fill="none" stroke="#555" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" class="done">
  <path d="M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z" />
  <rect x="0" y="0" width="24" height="24" fill="none" stroke="#555" stroke-width="2" rx="3" ry="3" />
</svg>`;


const edit_icon = `<svg fill="#28a745" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21px" height="21px" class='edit-btn'>
    <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z" />
</svg>`;



const delete_icon = `<svg fill="#e74c3c" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="21px" height="21px" class='delete-btn'">
<path
    d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
</svg>`;


function getViewportHeight() {
  const viewportHeight = window.innerHeight;
  const navbarHeight = document.querySelector('.navbar').offsetHeight; // Adjust selector as needed
  return viewportHeight - navbarHeight;
}

if(window.innerWidth < `600px`) {
const mobileHeight = getViewportHeight();
document.body.style.height = `${mobileHeight}`;
document.body.style.alignItems = "start";
}



const progressCircle = document.querySelector('.progress-ring__circle');
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
const percentageElement = document.getElementById('percentage');

progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100 * circumference);
  progressCircle.style.strokeDashoffset = offset;
  percentageElement.textContent = `${Math.floor(percent)}%`;
}

const allTasks = () => {
  return listContainer.children.length;
}

const completed = () => {
  return document.querySelectorAll('.checked').length;
}

function updateProgress() {
  const totalTasks = allTasks();
  taskCount.innerHTML = `Todo List ( ${totalTasks} )`;
  const completedTasks = completed();
  const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100
  setProgress(percentage);
}


 const handleStart = () => {
    addBtn.textContent = "Add";
    add_svg.style.display = "none";
    row_btn.classList.remove('start');
    row_btn.removeAttribute("onclick");
    inputBox.style.display = "inline-block";
    addBtn.style.display = "inline-block";
    inputBox.focus();
 }

 let focusTimeout;

 inputBox.addEventListener("focusout", function() {
     focusTimeout = setTimeout(function() {
         row_btn.classList.add('start');
         add_svg.style.display = "inline-block";
         inputBox.style.display = "none";
         addBtn.style.display = "none";
         row_btn.setAttribute("onclick", "handleStart()")
     }, 3000);
 });
 
 inputBox.addEventListener("focus", function() {
     if (focusTimeout) {
         clearTimeout(focusTimeout);
     }
 });
 


const addTask = () => {
    const taskValue = inputBox.value;
      if (taskValue === "") {
        alert("You must write something!");
    } else if (addBtn.textContent === "Save") {
        addBtn.textContent = "Add";
        const editingList = document.querySelector('.editing');
        const targetEl = editingList.parentElement.parentElement.querySelector('p');
        targetEl.innerHTML = inputBox.value;
        editingList.classList.remove('editing');
        inputBox.value = "";
        inputBox.focus();
    }

    else {
        let li = document.createElement("li");
        li.innerHTML = `${done_icon} &nbsp;&nbsp;&nbsp; <p class="first-child">${inputBox.value}</p>`;
        listContainer.appendChild(li);
        let btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');
        btnContainer.innerHTML = `${edit_icon}${delete_icon}`;
        li.appendChild(btnContainer)
        updateProgress();
        inputBox.focus();
    }
    inputBox.value = "";
    saveData();
};

// Store timeout IDs
const taskTimeouts = new Map();

const autoDeleteTask = (taskElement) => {
  taskElement.classList.add("after");
    const timeoutId = setTimeout(() => {
        if (taskElement.classList.contains('checked')) {
            taskElement.remove();
            updateProgress();
            saveData();
        }
    }, 9000); 
    taskTimeouts.set(taskElement, timeoutId);
}


listContainer.addEventListener(
  "click",
  function (e) {
    const svgTag = e.target.closest('svg');
    if (svgTag) {
      if (svgTag.classList.contains("done")) {
        const listItem = e.target.closest('li');
        svgTag.classList.toggle('done_checked');
        listItem.classList.toggle("checked");
        updateProgress();
        saveData();
        if (listItem.classList.contains("checked") && auto_del.checked) {
            autoDeleteTask(listItem);
        } else {
            li.classList.remove("after");
            clearTimeout(taskTimeouts.get(listItem));
            taskTimeouts.delete(listItem);
        }

      } else if (svgTag.classList.contains("edit-btn") && !svgTag.parentElement.parentElement.classList.contains('checked')) {
        let changeEl = document.querySelectorAll(".editing");
        changeEl.forEach(el => el.classList.remove('editing'));
        handleStart();
        inputBox.value = svgTag.parentElement.parentElement.children[1].textContent;
        inputBox.focus();
        addBtn.textContent = "Save";
        svgTag.classList.add('editing');
      } else if (svgTag.classList.contains("delete-btn")) {
        svgTag.parentElement.parentElement.remove();
        updateProgress();
      }
      saveData();
    }
  },
  false
);


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    updateProgress();
}

document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("refresh")) {
      sessionStorage.removeItem("refresh");
      const listItems = document.querySelectorAll('li');
      listItems.forEach(li => {
        if (li.classList.contains('checked') && auto_del.checked) {
          autoDeleteTask(li); 
        }
      });
      updateProgress();
    }
  });
  
  
  window.addEventListener('beforeunload', function() {
    sessionStorage.setItem("refresh", "true");
  });

  function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");

    // Select all list items
    const listItems = document.querySelectorAll('li');
    
    // Loop through each list item
    listItems.forEach(li => {
        if (li.classList.contains('checked') && auto_del.checked) {
            autoDeleteTask(li); // pass 'li' to the function
        }
    });

    updateProgress();
}


document.getElementById("input-box")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.key === "Enter") {
            document.getElementById("myButton").click();
        }
    });


showTask();
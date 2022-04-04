let btnAddTaskEL = document.querySelector("button");
let taskNameEL = document.querySelector("#content");

//khi reload trang nó sẽ tự load lại giữ liệu từ localStorage
let gettasklocal = gettaskfromLocal();
renderTasks(gettasklocal);

btnAddTaskEL.addEventListener("click", function (event) {
  if (!taskNameEL.value) {
    alert("vui lòng nhập tên công việc");
    return false; // không cho nó chạy tiếp
  }

  let getTaskId = event.target.getAttribute("id");
  let task = gettaskfromLocal();
  let taskItem = { name: taskNameEL.value };
  //this ở đây là đại diện cho funtion handelclick;
  if (getTaskId == 0 || getTaskId) {
    //sửa
    task[getTaskId] = taskItem; //cập nhật lại giữ liệu
    this.removeAttribute("id");
  } else {
    task.push(taskItem);
  }

  taskNameEL.value = ""; //sau khi nhập xong sẽ reset về rỗng
  //sau khi add sẽ lưu vào storage
  localStorage.setItem("tasks", JSON.stringify(task));
  renderTasks(task);
});

//hiển thị task
function renderTasks(task = []) {
  let content = "<ul>";
  task.forEach((item, index) => {
    content += `<li>
    <div class="task-name">${item.name}</div>
    <a href="#" onClick="editTask(${index})">Sửa</a>
    <a href="#" onClick="deleteTask(${index})">XÓa</a>
  </li>`;
  });
  content += "</ul>";
  document.querySelector(".reust").innerHTML = content;
}

//load dưới localstoge lên
function gettaskfromLocal() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}
//sửa task
function editTask(id) {
  let task = gettaskfromLocal();
  if (task.length > 0) {
    // hiển thị value lên input để sửa
    taskNameEL.value = task[id].name;
    //thêm attribute vào để khi bấm thêm nó sẽ cập nhật lại
    btnAddTaskEL.setAttribute("id", id);
  }
}
//xóa task
function deleteTask(id) {
  if (confirm("Bạn có muốn xóa không ?")) {
    let task = gettaskfromLocal();
    task.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(task));
    renderTasks(gettaskfromLocal);
  }
}

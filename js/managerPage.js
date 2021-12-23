// Xử lý thanh hiện tài khoản admin sau khi đăng nhập và nút Đăng xuất
document.querySelector('.header__navbar-item-link-register').classList.add('de-active')
document.querySelector('.header__navbar-item-link-login').classList.add('de-active')
document.querySelector('li.header__navbar-user').classList.remove('de-active')
var adminAccount = sessionStorage.getItem("adminAccount");
var adminID = sessionStorage.getItem("adminID");
$('.header__navbar-item-user-name').html(adminAccount);

//Khai báo các biến của các phần tử trong danh mục bao gồm link và table
const tableAccountLink= document.querySelector('.tableAccountLink')
const tableStudentLink= document.querySelector('.tableStudentLink')
const tableTeacherLink= document.querySelector('.tableTeacherLink')
const tableCourseLink= document.querySelector('.tableCourseLink')

const tableAccountForm = document.querySelector('.TableAccount')
const tableStudentForm = document.querySelector('.TableStudent')
const tableTeacherForm = document.querySelector('.TableTeacher')
const tableCourseForm = document.querySelector('.TableCourse')
const paginationDiv = document.querySelector('.pagination')

//Xử lý chế độ mặc định của các form: form danh sách tài khoản hiện ra trước, các form còn lại tạm thời đóng
firstLoad()
function firstLoad()
{
    tableAccountForm.classList.remove("de-active")
    tableStudentForm.classList.add("de-active")
    tableTeacherForm.classList.add("de-active")
    tableCourseForm.classList.add("de-active")
    paginationDiv.classList.remove("de-active")
    loadAccounts()
}



categoryLinkClicked()


function categoryLinkClicked(){

    tableAccountLink.addEventListener("click",e=>{

      $("#table-account-data tr").remove(); 
      tableAccountForm.classList.remove("de-active")
      tableStudentForm.classList.add("de-active")
      tableTeacherForm.classList.add("de-active")
      tableCourseForm.classList.add("de-active")
      paginationDiv.classList.remove("de-active")
      loadAccounts()

    })

    tableStudentLink.addEventListener("click",e=>{
      $("#table-student-data tr").remove(); 
      tableStudentForm.classList.remove("de-active")
      tableAccountForm.classList.add("de-active")
      tableTeacherForm.classList.add("de-active")
      tableCourseForm.classList.add("de-active")
        paginationDiv.classList.remove("de-active")

        loadStudents()


    })

    tableTeacherLink.addEventListener("click",e=>{
        $("#table-teacher-data tr").remove(); 
        tableStudentForm.classList.add("de-active")
        tableAccountForm.classList.add("de-active")
        tableTeacherForm.classList.remove("de-active")
        tableCourseForm.classList.add("de-active")
          paginationDiv.classList.remove("de-active") 
          loadTeachers()
      })

      tableCourseLink.addEventListener("click",e=>{
        $("#table-course-data tr").remove(); 
        tableStudentForm.classList.add("de-active")
        tableAccountForm.classList.add("de-active")
        tableTeacherForm.classList.add("de-active")
        tableCourseForm.classList.remove("de-active")
          paginationDiv.classList.remove("de-active") 
          loadCourses()
      })

}





async function loadAccounts()
{
    var accountList = await selectAccounts()
    buildAccountTable(accountList) 
}


async function selectAccounts() {
    var data = []
     await $.ajax({
      url: 'http://52.1.237.67:8080/myweb/api-account/*',
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      // async: !1,
      success: function (response) {
          data = response
      },
      error: function (jqXHR) 
      {
          console.log("The following error occured: " + textStatus, errorThrown);
      },
      complete: function () 
      {
      }
  })
  return data;
}

function buildAccountTable(data) 
{
    var table = document.getElementById('table-account-data')
    var row =``
  for (var i = 0; i < data.length; i++)
  {
    row = `<tr>
            <td class="userid">${data[i].id}</td>
            <td>${data[i].email}</td>
            <td>${data[i].password}</td>
            <td>${data[i].createdDate}</td>
            <td>${data[i].updatedDate}</td>
            <td>${data[i].role}</td>       
          </tr>`

          table.innerHTML += row
  }
}

async function loadStudents()
{
    var studentList = await selectStudent()
    buildStudentTable(studentList) 
}

async function selectStudent() {
  var data = []
   await $.ajax({
    url: 'http://52.1.237.67:8080/myweb/api-student/*',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    // async: !1,
    success: function (response) {
        data = response
    },
    error: function (jqXHR) 
    {
        console.log("The following error occured: " + textStatus, errorThrown);
    },
    complete: function () 
    {
    }
})
return data;
}

function buildStudentTable(data) 
{
  var table = document.getElementById('table-student-data')
  var row =``
for (var i = 0; i < data.length; i++)
{
  row = `<tr>
          <td class="userid">${data[i].studentId}</td>
          <td>${data[i].firstName}</td>
          <td>${data[i].lastName}</td>
          <td>${data[i].birthdate}</td>
          <td>${data[i].gender}</td>
          <td>${data[i].phone}</td>   
          <td>${data[i].address}</td>         
        </tr>`

        table.innerHTML += row
}
}



async function loadTeachers()
{
    var teacherList = await selectTeacher()
    buildTeacherTable(teacherList) 
}

async function selectTeacher() {
  var data = []
   await $.ajax({
    url: 'http://52.1.237.67:8080/myweb/api-teacher/*',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    // async: !1,
    success: function (response) {
        data = response
    },
    error: function (jqXHR) 
    {
        console.log("The following error occured: " + textStatus, errorThrown);
    },
    complete: function () 
    {
    }
})
return data;
}

function buildTeacherTable(data) 
{
  var table = document.getElementById('table-teacher-data')
  var row =``
for (var i = 0; i < data.length; i++)
{
  row = `<tr>
          <td class="userid">${data[i].teacherId}</td>
          <td>${data[i].name}</td>
          <td>${data[i].gender}</td>
          <td>${data[i].phone}</td>
          <td>${data[i].address}</td>   
          <td>${data[i].description}</td>         
        </tr>`

        table.innerHTML += row
}
}




async function loadCourses()
{
    var courseList = await selectCourse()
    buildCourseTable(courseList) 
}

async function selectCourse() {
  var data = []
   await $.ajax({
    url: 'http://52.1.237.67:8080/myweb/api-course',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    // async: !1,
    success: function (response) {
        data = response
    },
    error: function (jqXHR) 
    {
        console.log("The following error occured: " + textStatus, errorThrown);
    },
    complete: function () 
    {
    }
})
return data;
}

function buildCourseTable(data) 
{
  var table = document.getElementById('table-course-data')
  var row =``
for (var i = 0; i < data.length; i++)
{
  row = `<tr>
          <td class="userid">${data[i].courseId}</td>
          <td>${data[i].label}</td>
          <td>${data[i].period}</td>
          <td>${data[i].description}</td>
          <td>${data[i].semester}</td>   
          <td>${data[i].maxStudent}</td>   
          <td>${data[i].teacherId}</td>         
        </tr>`

        table.innerHTML += row
}
}
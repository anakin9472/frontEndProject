
// Xử lý thanh hiện tài khoản admin sau khi đăng nhập và nút Đăng xuất
document.querySelector('.header__navbar-item-link-register').classList.add('de-active')
document.querySelector('.header__navbar-item-link-login').classList.add('de-active')
document.querySelector('li.header__navbar-user').classList.remove('de-active')
var studentAccount = sessionStorage.getItem("studentAccount");
$('.header__navbar-item-user-name').html(studentAccount);
var studentId = sessionStorage.getItem("studentID");

//Khai báo các biến của các phần tử trong danh mục bao gồm link và table
const userProfileLink= document.querySelector('.userProfileLink')
const yourCourseLink= document.querySelector('.yourCourseLink')
const allCourseLink= document.querySelector('.allCourseLink')
const translateToolLink= document.querySelector('.translateToolLink')

const viewProfileDetails = document.querySelector('.viewProfileDetails')
const TableYourCourse = document.querySelector('.TableYourCourse')
const TableAllCourse = document.querySelector('.TableAllCourse')
const TranslateTool = document.querySelector('.TranslateTool')
const paginationDiv = document.querySelector('.pagination')

//Xử lý chế độ mặc định của các form: form danh sách tài khoản hiện ra trước, các form còn lại tạm thời đóng
firstLoad()
function firstLoad()
{
  viewProfileDetails.classList.remove("de-active")
  TableYourCourse.classList.add("de-active")
  TableAllCourse.classList.add("de-active")
  TranslateTool.classList.add("de-active")
    paginationDiv.classList.add("de-active")
    var formData = {studentId}
    loadProfile(formData)
}



categoryLinkClicked()


function categoryLinkClicked(){

  userProfileLink.addEventListener("click",e=>{

    viewProfileDetails.classList.remove("de-active")
    TableYourCourse.classList.add("de-active")
    TableAllCourse.classList.add("de-active")
    TranslateTool.classList.add("de-active")
      paginationDiv.classList.add("de-active")
      var formData = {studentId}
      loadProfile(formData)
    })

    yourCourseLink.addEventListener("click",e=>{
      $("#table-course-data tr").remove(); 
      viewProfileDetails.classList.remove("de-active")
      TableYourCourse.classList.remove("de-active")
      TableAllCourse.classList.add("de-active")
      TranslateTool.classList.add("de-active")
        paginationDiv.classList.remove("de-active")
        var formData = {studentId}
        loadStudentCourses(formData)
        
    })

    allCourseLink.addEventListener("click",e=>{
        $("#table-all-course-data tr").remove(); 
        viewProfileDetails.classList.remove("de-active")
        TableYourCourse.classList.add("de-active")
        TableAllCourse.classList.remove("de-active")
        TranslateTool.classList.add("de-active")
          paginationDiv.classList.remove("de-active")
          loadAllCourses()
      })

      translateToolLink.addEventListener("click",e=>{
        viewProfileDetails.classList.remove("de-active")
        TableYourCourse.classList.add("de-active")
        TableAllCourse.classList.add("de-active")
        TranslateTool.classList.remove("de-active")
          paginationDiv.classList.remove("de-active")
          loadAllCourses()
      })

}


async function loadProfile(formData)
{
  var profileItem = await selectStudentByID(formData)
  $('#user-fname').val(profileItem.firstName);
  $('#user-lname').val(profileItem.lastName);
  $('#user-address').val(profileItem.address);
  $('#user-phone').val(profileItem.phone);
  var gender = profileItem.gender;       
  if (gender == "Female")
  {
    document.getElementById("female-btn").checked = true;
  }
  else if (gender == "Male")
  {
      document.getElementById("male-btn").checked = true;
  }
  $('#user-birthdate').val(profileItem.birthdate);
}




async function selectStudentByID(formData) {
  var data = []
   await $.ajax({
    url: 'http://52.1.237.67:8080/myweb/api-student-advance',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData),
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


var btnUpdate = document.querySelector("#btnUpdateUser")
btnUpdate.addEventListener('click', async (e)=>
{
  e.preventDefault();
  var firstName = $('#user-fname').val()
  var lastName = $('#user-lname').val()
  var phone =  $('#user-phone').val()
  var address =  $('#user-address').val()
  var gender
  var temp = $('input[name="female-btn"]:checked').val();


  var temp = document.getElementById("female-btn").checked
    if (temp == true)
    {
      gender = "Female"
    }
    else
    {
      gender = "Male"
    }
    var birthdate =  $('#user-birthdate').val()
  var formData = {studentId, firstName, lastName, birthdate, gender, phone, address}
  await uploadStudent(formData)
  loadProfile(formData)
}) 


async function uploadStudent(formData)
{       
    await $.ajax({
        url: 'http://52.1.237.67:8080/myweb/api-student/*',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (response) 
        {
            console.log(response);                  
            const myJSON = JSON.stringify(response);
            if (myJSON != "false")
            {
              console.log("Chỉnh sửa thành công")

            }
            else
            {
                console.log("Chỉnh sửa không thành công")
            }
        },
        error: function (jqXHR) {
            // log the error to the console
            console.log("The following error occured: " + textStatus, errorThrown);
        },
        complete: function () {
            console.log("Incomplete");
        }
    })
}


async function loadAllCourses()
{
    var courseList = await selectAllCourse()
    buildCourseTable(courseList) 
    // console.log(courseList)
}

async function selectAllCourse() {
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
  console.log("test")
  var table = document.getElementById('table-all-courses-data')

  var $button = "<button onclick='addCourses(this)'>" +
  `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-pencil-square" viewBox="0 0 16 16">
 <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
 <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
  `
   + "</button>";

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
          <td>${$button}</td>             
        </tr>`

        table.innerHTML += row
}
}



async function addCourses(td) 
{
    selectedRow = td.parentElement.parentElement
    courseId = selectedRow.cells[0].innerHTML
    var formData = {studentId, courseId}
    console.log(formData)
    await addCourse(formData)
    
}


async function addCourse(formData)
{       
    await $.ajax({
        url: 'http://52.1.237.67:8080/myweb/api-study',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (response) 
        {
            console.log(response);                  
            const myJSON = JSON.stringify(response);
            if (myJSON != "false")
            {
              console.log("Thêm khóa học thành công")

            }
            else
            {
                console.log("Thêm khóa học không thành công")
            }
        },
        error: function (jqXHR) {
            // log the error to the console
            console.log("The following error occured: " + textStatus, errorThrown);
        },
        complete: function () {
            console.log("Incomplete");
        }
    })
}



var btnTranslate = document.querySelector("#btnTranslate")
btnTranslate.addEventListener('click', async (e)=>
{
  e.preventDefault();
  var originText = $('#firstLanguage').val()
  var sourceLanguageCode = $('#user-firstLanguage').val()
  var targetLanguageCode =  $('#user-secondLanguage').val()
  var formData = {originText, sourceLanguageCode, targetLanguageCode}
  console.log(formData)
  var result = await translate(formData)
  console.log(result)
  $('#secondLanguage').val(result)
 
}) 

async function translate(formData)
{       
  var data
    await $.ajax({
        url: 'http://52.1.237.67:8080/myweb/api-translate',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (response) 
        {
            data = response
        },
        error: function (jqXHR) {
            // log the error to the console
            console.log("The following error occured: " + textStatus, errorThrown);
        },
        complete: function () {
            console.log("Incomplete");
        }
    })
    return data;
}

























async function loadStudentCourses(formData)
{
    var studentCourseList = await selectStudentCourses(formData)
    buildStudentCourses(studentCourseList) 
}


async function selectStudentCourses(formData) {
    var data = []
     await $.ajax({
      url: 'http://52.1.237.67:8080/myweb/api-advance-study',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(formData),
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

function buildStudentCourses(data) 
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






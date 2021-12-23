if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
    var userid
    var studentAccount = sessionStorage.getItem("studentAccount");

    selectCourses();
    $('#admin-account').html(studentAccount);


}


function selectCourses() {
    $.ajax({
        url: 'http://3.219.197.153:8080/myweb/api-course',

        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            buildCoursesTable(response);
           
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

function buildCoursesTable(data) 
{
  var table = document.getElementById('table-data')
  for (var i = 0; i < data.length; i++)
  {

    // userid = data[i].id
    // console.log(userid)
    var $button = "<button onclick='test(this)'>" +"XEM DS SV" + "</button>";
 

    var row = `<tr>
            <td class="courseid">${data[i].courseId}</td>
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


function test(td) {

    



}

function createButtons() {
    var out = document.getElementById("out");

        var node = document.createElement("button");
        // node.id = arr[i];
        // node.innerHTML = "button " + arr[i];
        node.innerHTML = "Xem DS sv "
        node.addEventListener("click", onClick, false);
        out.appendChild(node);

}

function onClick(temp) {
    alert("you clicked button with id: " + temp);
}
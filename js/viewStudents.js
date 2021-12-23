if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
    var userid
    var adminAccount = sessionStorage.getItem("adminAccount");

    selectStudent();
    $('#admin-account').html(adminAccount);


}


function selectStudent() {
    $.ajax({
        url: 'http://3.219.197.153:8080/myweb/api-student/*',

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
    var $button = "<button onclick='test(this)'>" +"XEM KHÓA HỌC CỦA SV" + "</button>";
 

    var row = `<tr>
            <td class="courseid">${data[i].studentId}</td>
            <td>${data[i].firstName}</td>
            <td>${data[i].lastName}</td>
            <td>${data[i].birthdate}</td>
            <td>${data[i].gender}</td>
            <td>${data[i].phone}</td>
            <td>${data[i].address}</td>
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
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
    var userid
    var adminAccount = sessionStorage.getItem("adminAccount");
    var adminID = sessionStorage.getItem("adminID");
    console.log(adminAccount);
    console.log(adminID);
    selectAccounts();
    $('#admin-account').html(adminAccount);

    $("#btn-view").click(function () {
        console.log("Da click")
    })

}


function selectAccounts() {
    $.ajax({
        url: 'http://3.219.197.153:8080/myweb/api-account/*',
        // url: 'http://localhost:8080/myweb/AccountAPIServlet',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            buildAccountsTable(response);
           
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

function buildAccountsTable(data) 
{
  var table = document.getElementById('table-data')
  for (var i = 0; i < data.length; i++)
  {
      function greet() {
    console.log('Hey there clicker!');
}
    userid = data[i].id
    console.log(userid)
    var $button = "<button onclick='test(this)'>" +"XEM CHI TIẾT" + "</button>";
 

    var row = `<tr>
            <td class="userid">${data[i].id}</td>
            <td>${data[i].email}</td>
            <td>${data[i].password}</td>
            <td>${data[i].createdDate}</td>
            <td>${data[i].updatedDate}</td>
            <td>${$button}</td>         
          </tr>`
 

    table.innerHTML += row
  }
}


function test(td) {

    selectedRow = td.parentElement.parentElement
    var userid = selectedRow.cells[0].innerHTML
    var email = selectedRow.cells[1].innerHTML
    sessionStorage.setItem("studentAccount", email);
    sessionStorage.setItem("studentID", userid);
    window.location.href = '/viewProfile.html';



}

function createButtons() {
    var out = document.getElementById("out");

        var node = document.createElement("button");
        // node.id = arr[i];
        // node.innerHTML = "button " + arr[i];
        node.innerHTML = "Xem chi tiết "
        node.addEventListener("click", onClick, false);
        out.appendChild(node);

}

function onClick(temp) {
    alert("you clicked button with id: " + temp);
}
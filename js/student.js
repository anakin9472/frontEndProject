if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}
function ready() {
    var studentAccount = sessionStorage.getItem("studentAccount");
    var studentID = sessionStorage.getItem("studentID");
    $('#student-account').html(studentAccount);
    $('#student-email').val(studentAccount);
    $('#studentid').val(studentID);
    renderFirstTimeDaysOption()
    renderMonthOption()
    renderYearOption()
}



$("#btn-submit").click(function(e){

  // var studentid = $("#studentid").val()
  // var email = $("#student-email").val()
  // var fname = $("#fname").val()
  // var lname = $("#lname").val()
  // var bdate = $('#choseDays').val();
  // var month = $('#choseMonths').val();
  // var year = $('#choseYears').val();
  // var temp = $('input[name="female-btn"]:checked').val();
  // var fname = $("#phone-number").val()
  // var lname = $("#address").val()
  
  // if (temp == "on")
  // {
  //   gender = "female"
  // }
  // else
  // {
  //   gender = "male"
  // }
  // var birthdate = bdate + "/" + month + "/" + year
  // console.log(birthdate)
  e.preventDefault();
  var formData = {email:"nguyenphuocdang1234@gmail.com",birthday:"13/03/2000"}
  console.log(formData)
$('#student-email').val(formData["email"]);


1/1/2001




})


var setYear = 0;
var setMonth = 0;
var dayArray = new Array(
  "31",
  "28",
  "31",
  "30",
  "31",
  "30",
  "31",
  "31",
  "30",
  "31",
  "30",
  "31"
);


function onChangeYear(val) {
    setYear = val;
    var dayOption = '<option value="">Ngày</option>';
    // dayArray[val-1];
    if (setMonth != 0) {
      if (val % 4 == 0 && setMonth == 2) {
        for (var i = 1; i <= parseInt(dayArray[setMonth - 1]) + 1; i++) {
          dayOption += '<option value="' + i + '">' + i + "</option>";
        }
      } else {
        for (var i = 1; i <= parseInt(dayArray[setMonth - 1]); i++) {
          dayOption += '<option value="' + i + '">' + i + "</option>";
        }
      }
      $("#choseDays").html(dayOption);
    } else {
      for (var i = 1; i <= 31; i++) {
        dayOption += '<option value="' + i + '">' + i + "</option>";
      }
      $("#choseDays").html(dayOption);
    }
  }
  
  function onChangeMonth(val) {
    setMonth = val;
    var dayOption = '<option value="">Ngày</option>';
    // dayArray[val-1];
    if (setYear != 0) {
      if (setYear % 4 == 0 && val == 2) {
        for (var i = 1; i <= parseInt(dayArray[val - 1]) + 1; i++) {
          dayOption += '<option value="' + i + '">' + i + "</option>";
        }
      } else {
        for (var i = 1; i <= dayArray[val - 1]; i++) {
          dayOption += '<option value="' + i + '">' + i + "</option>";
        }
      }
      $("#choseDays").html(dayOption);
    } else {
      for (var i = 1; i <= dayArray[val - 1]; i++) {
        dayOption += '<option value="' + i + '">' + i + "</option>";
      }
      $("#choseDays").html(dayOption);
    }
  }


  

function renderFirstTimeDaysOption(){
    let dayOptions = '<option value="">Date</option>';
      for (let i = 1; i <= 31; i++) {
        dayOptions += '<option value="' + i + '">' + i + "</option>";
      }
      $("#choseDays").html(dayOptions)
}

function renderMonthOption(){
    let monthOptions = '<option value="">Month</option>';
      for (let i = 1; i <= 12; i++) {
        monthOptions += '<option value="' + i + '"> Tháng ' + i + "</option>";
      }
      $("#choseMonths").html(monthOptions)
}

function renderYearOption(){
    let d = new Date();
    let yearOptions = '<option value="">Year</option>';
      for (let i = d.getFullYear(); i >= 1930; i--) {
        yearOptions += '<option value="' + i + '">' + i + "</option>";
      }
      $("#choseYears").html(yearOptions)
}



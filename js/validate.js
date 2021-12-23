if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
    addAccount()
    loginAccount()
    activeAuthForm()
}



function addAccount() {
    var btnsubmit = document.querySelector("#btn-submit-register")
    btnsubmit.addEventListener('click', (e) => {
        e.preventDefault();

        var email = $("#register-form_email").val();
        var password = $("#register-form_pass").val();
        var repassword = $("#register-form_repass").val();
        var temp = $('input[name="teacher"]:checked').val();
        var temp2 = $('input[name="student"]:checked').val();
        var fname = $("#phone-number").val()
        var lname = $("#address").val()
        
        if (temp == "on")
        {
            role = "teacher"
        }
        else
        {
            role = "student"
        }
        // get return ajax object
        var ajaxObj = checkAvailableMail();

        var ajaxResponse = ajaxObj.responseText;
        console.log(ajaxResponse);
        if (temp != "on" && temp2 != "on")
        {
            document.querySelector('.auth-form-notification-label').classList.remove('de-active');
            $('.auth-form-notification-label').html(`Vui lòng điền đầy đủ thông tin`);         
        }
        else if (email === "" || password === "" || repassword === "") 
        {
            document.querySelector('.auth-form-notification-label').classList.remove('de-active');
            $('.auth-form-notification-label').html(`Vui lòng điền đầy đủ thông tin`);
        }
        else if (password != repassword) {
            document.querySelector('.auth-form-notification-label').classList.remove('de-active');
            $('.auth-form-notification-label').html(`Xác nhận mật khẩu không hợp lệ`);
        }
        else if (!validMail(email)) {
            document.querySelector('.auth-form-notification-label').classList.remove('de-active');
            $('.auth-form-notification-label').html(`Mail không hợp lệ`);
        }
        // else if (ajaxResponse === "\"true\"")
        else if (ajaxResponse === "true") {
            document.querySelector('.auth-form-notification-label').classList.remove('de-active');
            $('.auth-form-notification-label').html(`Mail này đã được sử dụng`);
        }
        else {
            //Validate xong
            $('.auth-form-notification-label').html(``);
            var formData = { email, password, role }
            addAccountAPI(formData);
            console.log(formData)
        }

    })
}

function validMail(mailAddress) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(mailAddress);
}

function checkAvailableMail() {
    var email = $("#register-form_email").val();
    var formData = { email };
    var result;
    return $.ajax({
        url: 'http://52.1.237.67:8080/myweb/api-check-email',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        dataType: 'json',
        async: !1,
        success: function (response) {

        },
        error: function (jqXHR) {
            // log the error to the console
            console.log("The following error occured: " + textStatus, errorThrown);
        },
    })
}

function addAccountAPI(formData) {
    $.ajax({
        url:'http://52.1.237.67:8080/myweb/api-account/*',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (response) 
        {
            // console.log(response);
            // const myJSON = JSON.stringify(response);
            // console.log(response.id);
            // console.log(JSON.stringify(response.id));
            document.querySelector('.auth-form-notification-label').classList.remove('de-active');
            $('.auth-form-notification-label').html(`Chúc mừng! Bạn đã đăng ký thành công`);
            //Sau khi đăng ký thành công, tài khoản được thêm vào bảng Student
            var studentid = response.id;
            formData = {studentid};
            addStudentAPI(formData);

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

// KIỂM TRA ĐĂNG NHẬP
function loginAccount() {
    $("#btn-submit-login").click(function () {
        var email = $('#login-form_email').val();
        var password = $('#login-form_password').val();
        var formData = { email, password };
        $.ajax({
            url: 'http://52.1.237.67:8080/myweb/api-login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function (response) {

                const myJSON = JSON.stringify(response);
                if (myJSON != "false") 
                {
                    // console.log("Đăng nhập thành công")
                    // //tắt form Login
                    // document.querySelector('.auth-form-login').classList.remove('activeBlock');

                    // //tắt cả modal
                    // document.querySelector('.modal').classList.remove('activeFlex');


                    document.querySelector('.login-form-notification-label').classList.remove('de-active')
                    $('.login-form-notification-label').html(`Đăng nhập thành công`)
                    document.querySelector('.auth-form-login').classList.remove('activeBlock');   
                    document.querySelector('.modal').classList.remove('activeFlex');  

                    console.log(response.role)    
                    var role =    JSON.stringify(response.role);  
                    if (role == "\"student\"")
                    {
                       
                        sessionStorage.setItem("studentAccount", email);
                        var studentID = response.id
                        sessionStorage.setItem("studentID", studentID);
                        window.location.href = '/studentPage.html';
                    }
                    else
                    {  
                        sessionStorage.setItem("adminAccount", email);
                        var adminID = response.id
                        sessionStorage.setItem("adminID", adminID);
                        window.location.href = '/managerPage.html';
                        // window.location.href = '/viewAccounts.html';                
                    }    



                }
                else 
                {
                    document.querySelector('.login-form-notification-label').classList.remove('de-active')
                    $('.login-form-notification-label').html(`Đăng nhập không hợp lệ`)
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
    })
}

function getRole(email) {
    // var email = $("#login-form_email").val();
    var formData = { email };
    var result;
    return $.ajax({
        // url: 'http://localhost:8080/api-role',
        url: 'http://52.1.237.67:8080/myweb/api-role',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        dataType: 'json',
        async: !1,
        success: function (response) 
        {

        },
        error: function (jqXHR) {
            // log the error to the console
            console.log("The following error occured: " + textStatus, errorThrown);
        },
    })
}

function addStudentAPI(formData) 
{
    $.ajax({
        url:'http://52.1.237.67:8080/myweb/api-student/*',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (response) 
        {
            console.log("Đăng ký sinh viên thành công");
        },
        error: function (jqXHR) 
        {
            console.log("The following error occured: " + textStatus, errorThrown);
        },
        complete: function () 
        {
            console.log("Incomplete");
        }
    })
}




// THỰC HIỆN MỞ FORM REGISTER VÀ LOGIN
function activeAuthForm() {
    // ACTIVE AND DE-ACTIVE AUTH-FORM - start 

    const loginHeaderBtn = document.querySelector('.header__navbar-item-link-login')
    const backBtns = document.querySelectorAll('.auth-form__controls-back')
    const registerHeaderBtn = document.querySelector('.header__navbar-item-link-register')
    const loginSwitchBtn = document.querySelector('.auth-form__switch-btn-to-login')
    const registerSwitchBtn = document.querySelector('.auth-form__switch-btn-to-register')
    const actualLoginBtn = document.querySelector('.auth-form__controls-login')
    const logoutHeaderUserList = document.querySelector('.header__navbar-user-item-link--logout')

    loginHeaderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.modal').classList.add('activeFlex');
        document.querySelector('.auth-form-login').classList.add('activeBlock');
        authFormActivation();
    })

    registerHeaderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.modal').classList.add('activeFlex');
        document.querySelector('.auth-form-register').classList.add('activeBlock');
        authFormActivation();
    })
    function authFormActivation() {

        loginSwitchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.auth-form-register').classList.remove('activeBlock');
            document.querySelector('.auth-form-login').classList.add('activeBlock');
        })

        registerSwitchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.auth-form-login').classList.remove('activeBlock');
            document.querySelector('.auth-form-register').classList.add('activeBlock');
        })


        for (i = 0; i < backBtns.length; i++) {
            backBtns[i].addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('.auth-form-login').classList.remove('activeBlock');
                document.querySelector('.auth-form-register').classList.remove('activeBlock');
                document.querySelector('.modal').classList.remove('activeFlex');
                document.querySelector('.auth-form-notification-label').classList.add('de-active')
            })
        }
    }

    // actualLoginBtn.addEventListener("click",(e)=>{

    //     document.querySelector('li.header__navbar-user').classList.remove('de-active')
    //     document.querySelector('.auth-form-login').classList.remove('activeBlock');
    //     document.querySelector('.modal').classList.remove('activeFlex');
    // })
    logoutHeaderUserList.addEventListener("click", (e) => {
        document.querySelector('li.header__navbar-user').classList.add('de-active')
    })

    // ACTIVE AND DE-ACTIVE AUTH-FORM - end
    







}








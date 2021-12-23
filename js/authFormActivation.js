if(document.readyState =='loading')
{
    document.addEventListener('DOMContentLoaded',ready)
} 
else
{
    ready()
}
function ready()
{
   activeAuthForm() 
}
function activeAuthForm() {
    // ACTIVE AND DE-ACTIVE AUTH-FORM - start 

    const loginHeaderBtn = document.querySelector('.header__navbar-item-link-login')
    const backBtns = document.querySelectorAll('.auth-form__controls-back')
    const registerHeaderBtn = document.querySelector('.header__navbar-item-link-register')
    const loginSwitchBtn = document.querySelector('.auth-form__switch-btn-to-login')
    const registerSwitchBtn = document.querySelector('.auth-form__switch-btn-to-register')
    const logoutHeaderUserList = document.querySelector('.header__navbar-user-item-link--logout')

    loginHeaderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.modal').classList.add('activeFlex');
        document.querySelector('.auth-form-login').classList.add('activeBlock');
        authFormActivation();
        document.querySelector("#login-form_email").value=""
        document.querySelector("#login-form_password").value=""
     
    })

    registerHeaderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.modal').classList.add('activeFlex');
        document.querySelector('.auth-form-register').classList.add('activeBlock');
        authFormActivation();
        document.querySelector("#register-form_email").value=""
        document.querySelector("#register-form_pass").value=""
        document.querySelector("#register-form_repass").value=""
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

    //Xử lý đăng xuất
    logoutHeaderUserList.addEventListener("click", (e) => {
        document.querySelector('li.header__navbar-user').classList.add('de-active')
        document.querySelector('.header__navbar-item-link-register').classList.remove('de-active')
        document.querySelector('.header__navbar-item-link-login').classList.remove('de-active')
        sessionStorage.removeItem("userAccount")
       window.location.href="/index.html"
    })
    // ACTIVE AND DE-ACTIVE AUTH-FORM - end
}  
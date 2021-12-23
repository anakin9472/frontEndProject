if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}
function ready() {
    var userEmail = sessionStorage.getItem("userAccount")
    if(userEmail != null  &&  userEmail != ""){
        document.querySelector('.header__navbar-item-link-register').classList.add('de-active')
        document.querySelector('.header__navbar-item-link-login').classList.add('de-active')
        document.querySelector('li.header__navbar-user').classList.remove('de-active')
        document.querySelector('.header__navbar-item-user-name').innerText = userEmail
        
        var customerid=sessionStorage.getItem("userID")
        if(customerid != null  &&  customerid != ""){

            var formData= {customerid}
            getCustomerFromID(formData)
        }
    }
}
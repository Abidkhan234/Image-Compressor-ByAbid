// for password showing

const closeEye = document.getElementById("close-eye");

const showBtn = document.querySelector(".showHideBtn");

const passwordInput = document.querySelector("#Password");

showBtn.addEventListener("click", () => {
    if (closeEye.className === "fas fa-eye-slash") {
        closeEye.className = "fas fa-eye";
        passwordInput.type = "text";
    } else {
        closeEye.className = "fas fa-eye-slash";
        passwordInput.type = "password";
    }
})

// for password showing

// For error showing 

const errorEle = document.querySelectorAll(".errorEle");

const userNameInput = document.querySelector("#userName");

const emailInput = document.querySelector("#Email");

const signUpBtn = document.querySelector("#signUp-btn");

signUpBtn.addEventListener("click", () => {

    if (localStorage.getItem("UserEmail")) {
        window.location.href = "loginPage.html";
    } else {
        // For User Name
        if (!userNameInput.value) {
            errorEle[0].innerHTML = "User Name is mandatory";
        } else if (userNameInput.value.length < 4) {
            errorEle[0].innerHTML = "User Name must be atleast 4 character long";
        } else {
            errorEle[0].innerHTML = "";
        }

        // For Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value) {
            errorEle[1].innerHTML = "Email is mandatory";
        } else if (!emailPattern.test(emailInput.value)) {
            errorEle[1].innerHTML = "Please enter a valid email address";
        } else {
            errorEle[1].innerHTML = "";
        }

        // For password
        if (!passwordInput.value) {
            errorEle[2].innerHTML = "Password is mandatory";
            showBtn.style.top = "40%";
        } else if (passwordInput.value.length < 6) {
            errorEle[2].innerHTML = "Password must be atleast 6 character long";
            showBtn.style.top = "40%";
        } else {
            errorEle[2].innerHTML = "";
            showBtn.style.top = "";
        }

        if (errorEle[0].innerHTML == "" && errorEle[1].innerHTML == "" && errorEle[2].innerHTML == "") {
            localStorage.setItem("UserEmail", emailInput.value);
            emailInput.value = "";
            passwordInput.value = "";
            userNameInput.value = "";
            window.location.href= "loginPage.html";
        }
    }

});
// For error showing 

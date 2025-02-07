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

const emailInput = document.querySelector("#Email");

const loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", () => {

    if (localStorage.getItem("UserEmail")) {

        // For Email
        if (!emailInput.value) {
            errorEle[0].innerHTML = "Email is mandatory";
        } else if (emailInput.value !== localStorage.getItem("UserEmail")) {
            errorEle[0].innerHTML = "Enter correct Email";
        } else {
            errorEle[0].innerHTML = "";
        }

        // For password
        if (!passwordInput.value) {
            errorEle[1].innerHTML = "Password is mandatory";
            showBtn.style.top = "31%";
        } else if (passwordInput.value.length < 6) {
            errorEle[1].innerHTML = "Password must be atleast 6 character long";
            showBtn.style.top = "31%";
        } else {
            errorEle[1].innerHTML = "";
            showBtn.style.top = "";
        }

        if (errorEle[0].innerHTML == "" && errorEle[1].innerHTML == "") {
            alert("Loged In Successfully");
            window.location.href = "../index.html";
            emailInput.value = "";
            passwordInput.value = "";
            userNameInput.value = "";
        }
    } else {
        alert("Create Account First");
    }

});

// For error showing 
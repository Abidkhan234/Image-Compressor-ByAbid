// For profile menu show and close

const profileMenu = document.querySelector(".profile-menu");

const profileCloseBtn = document.querySelector(".close-btn i");

const profileOpenBtn = document.querySelector("#profileShowBtn");

profileOpenBtn.addEventListener("click", () => {
    profileMenu.classList.add("profile-menu-show");
})

profileCloseBtn.addEventListener("click", () => {
    profileMenu.classList.remove("profile-menu-show");
})

// For profile menu show and close


// For image-compressor btn

const imageCompressorBtn = document.querySelector("#image-compressor-btn");

const imageCompressorOverlay = document.querySelector(".image-compressor-overlay");

imageCompressorBtn.addEventListener("click", () => {
    imageCompressorOverlay.classList.add("image-compressor-overlay-show");
})


// For image-compressor btn
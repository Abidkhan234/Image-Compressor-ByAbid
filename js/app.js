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

const imageCompressorBox = document.querySelector(".image-compressor-box");

const imageCompressorBoxClose = document.querySelector(".close-image-compressor i");

const previewImage = document.querySelector(".image-compressor-content .content-2 img");

const inputBox = document.querySelector("#input-box");

imageCompressorBtn.addEventListener("click", () => {
    imageCompressorBox.classList.add("image-compressor-box-show");
    imageCompressorOverlay.classList.add("image-compressor-overlay-show");
})

imageCompressorBoxClose.addEventListener("click", () => {
    imageCompressorBox.classList.remove("image-compressor-box-show");
    imageCompressorOverlay.classList.remove("image-compressor-overlay-show");
    previewImage.src = "images/upload-icon.svg";
    document.querySelector(".content-2").classList.remove("active");
})

// For image-compressor btn

// For image upload 

const levelCompressorDiv = document.querySelector(".level-compressor")

document.querySelector(".image-compressor-content").addEventListener("click", () => inputBox.click());

inputBox.addEventListener("change", (e) => {
    try {
        // Check if file exists
        if (!e.target.files || !e.target.files[0]) {
            throw new Error('No file selected');
        }

        const userFile = e.target.files[0];

        // Validate file type
        if (!userFile.type.match('image.*')) {
            throw new Error('Please select an image file');
        }

        // Create URL safely
        const url = URL.createObjectURL(userFile);

        // Show preview
        previewImage.src = url;

        // Cleanup URL after image loads
        previewImage.onload = () => {
            URL.revokeObjectURL(url);
        };

        levelCompressorDiv.classList.add("level-compressor-show");
        document.querySelector(".content-2").classList.add("active");

    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
});

document.querySelector("#dowload-image").addEventListener("click", () => compressedImage());

const compressedImage = () => {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;

    ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);

    const a = document.createElement("a");

    let imageQuality = null;

    const originalSize = previewImage.src.length * (3 / 4) / (1024 * 1024); // Size in MB

    switch (true) {
        case originalSize > 5: // > 5MB
            imageQuality = 0.1;
            break;
        case originalSize > 2: // 2-5MB
            imageQuality = 0.2;
            break;
        case originalSize > 1: // 1-2MB
            imageQuality = 0.3;
            break;
        default: // < 1MB
            imageQuality = 0.7;
    }

    a.href = canvas.toDataURL("image/jpeg", imageQuality);

    a.download = `compressed Image.jpg`;

    a.click();

    inputBox.value = "";

    document.querySelector(".content-2").classList.remove("active");

    previewImage.src = "images/upload-icon.svg";

    levelCompressorDiv.classList.remove("level-compressor-show");
}

// For image upload 


// For image-compressor btn2

const imageCompressorBtn2 = document.querySelector("#image-compressor-btn-2");

const imageCompressorOverlay2 = document.querySelector(".image-compressor-overlay-2");

const imageCompressorBox2 = document.querySelector(".image-compressor-box-2");

const imageCompressorBoxClose2 = document.querySelector(".close-image-compressor-2 i");

const previewImage2 = document.querySelector(".image-compressor-content .content-3 img");

const inputBox2 = document.querySelector("#input-box-2");

const levelCompressorDiv2 = document.querySelector(".level-compressor-2")

imageCompressorBtn2.addEventListener("click", () => {
    imageCompressorBox2.classList.add("image-compressor-box-show-2");
    imageCompressorOverlay2.classList.add("image-compressor-overlay-show-2");
})

imageCompressorBoxClose2.addEventListener("click", () => {
    imageCompressorBox2.classList.remove("image-compressor-box-show-2");
    imageCompressorOverlay2.classList.remove("image-compressor-overlay-show-2");
    previewImage2.src = "images/upload-icon.svg";
    document.querySelector(".content-3").classList.remove("active");
    levelCompressorDiv2.classList.remove("level-compressor-show-2");
})

// For image-compressor btn2

document.querySelector(".image-compressor-content-2").addEventListener("click", () => inputBox2.click());

const widthEle = document.querySelector("#widthEle");

const heightEle = document.querySelector("#heightEle");

let ogRatio;

inputBox2.addEventListener("change", (e) => {
    try {

        if (!e.target.files || !e.target.files[0]) {
            throw new Error('No file selected');
        }

        levelCompressorDiv2.classList.add("level-compressor-show-2");

        const userFile = e.target.files[0];

        const url = URL.createObjectURL(userFile);

        previewImage2.src = url;

        previewImage2.addEventListener("load", () => {

            widthEle.value = previewImage2.naturalWidth;

            heightEle.value = previewImage2.naturalHeight;

            ogRatio = previewImage2.naturalWidth / previewImage2.naturalHeight;

        })

        document.querySelector(".image-compressor-content-2 .content-3").classList.add("active");

    } catch (error) {
        alert(error.message);
        levelCompressorDiv2.classList.remove("level-compressor-show-2");
        document.querySelector(".image-compressor-content-2 .content-3").classList.remove("active");
        previewImage2.src = "images/upload-icon.svg";
    }

});

// For Setting image width height

widthEle.addEventListener("change", () => settingWidthFunc());

heightEle.addEventListener("change", () => settingHeightFunc());

const aspectRatioEle = document.querySelector("#checkedEle");

const settingWidthFunc = () => {
    let height = aspectRatioEle.checked ? widthEle.value / ogRatio : heightEle.value;
    heightEle.value = Math.floor(height);
}


const settingHeightFunc = () => {
    let width = aspectRatioEle.checked ? heightEle.value / ogRatio : widthEle.value;
    widthEle.value = Math.floor(width);
}

// For Setting image width height

document.querySelector("#dowload-image-2").addEventListener("click", () => compressedImage2());

const compressedImage2 = () => {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = widthEle.value;

    canvas.height = heightEle.value;

    ctx.drawImage(previewImage2, 0, 0, canvas.width, canvas.height);

    const a = document.createElement("a");

    a.href = canvas.toDataURL("image/jpeg");

    a.download = `Resized Image.jpg`;

    a.click();

    inputBox.value = "";

    document.querySelector(".content-3").classList.remove("active");

    previewImage2.src = "images/upload-icon.svg";

    levelCompressorDiv2.classList.remove("level-compressor-show-2");
}

// For image upload 

// For Sign-form

const signInBtn = document.querySelector(".sign-in-btn");

signInBtn.addEventListener("click", () => window.location.href = "screen/loginPage.html");

// For Sign-form
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

    const selectedMenu = document.querySelector("#select-menu");
    const originalSize = previewImage.src.length * (3 / 4) / (1024 * 1024); // Size in MB

    switch (selectedMenu.value) {
        case "Low":
            imageQuality = originalSize > 1 ? 0.1 : 0.2;
            break;
        case "Medium":
            imageQuality = originalSize > 1 ? 0.3 : 0.5;
            break;
        case "High":
            imageQuality = originalSize > 1 ? 0.6 : 0.8;
            break;
        default:
            imageQuality = 0.5;
    }

    a.href = canvas.toDataURL("image/jpeg", imageQuality);

    a.download = `compressed Image.jpg`;

    a.click();

    inputBox.value = "";

    document.querySelector(".content-2").classList.remove("active");

    previewImage.src = "images/upload-icon.svg";
}

// For image upload 
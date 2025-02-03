// For profile menu show and close

const profileMenu = document.querySelector(".profile-menu");

const profileCloseBtn = document.querySelector(".close-btn i");

const profileOpenBtn = document.querySelector("#profileShowBtn");

profileOpenBtn.addEventListener("click", () => {
    profileMenu.classList.add("profile-menu-show");
    historyData();
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
    document.querySelector(".content-2").classList.remove("active");
    previewImage.src = "images/upload-icon.svg";
})

// For image-compressor btn

// For image upload 

const imageUploadDiv = document.querySelector(".image-compressor");

const ImageDownloadBtn = document.querySelector("#dowload-image");

imageUploadDiv.addEventListener("click", () => inputBox.click());

inputBox.addEventListener("change", (e) => {

    const userFile = e.target.files[0];

    const url = URL.createObjectURL(userFile);

    let storingData = JSON.parse(sessionStorage.getItem("imageData")) || [];

    storingData.push({
        imageSrc: url,
        id: Math.ceil(Math.random() * 10),
    });

    sessionStorage.setItem("imageData", JSON.stringify(storingData));

    const img = new Image();

    img.src = url;

    img.onload = () => {
        document.querySelector(".content-2").classList.add("active");
        previewImage.src = url;
    }

    ImageDownloadBtn.style.display = "inline";

    ImageDownloadBtn.addEventListener("click", () => downloadImage(userFile));
})

const downloadImage = (e) => {
    const selectMenu = document.querySelector("#select-menu");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!previewImage.complete || !previewImage.naturalHeight) {
        alert('Image not loaded');
        return;
    }

    let imageQuality = null;

    switch (selectMenu.value) {
        case "Medium":
            imageQuality = 0.6;
            break;
        case "Low":
            imageQuality = 0.4;
            break;
        default:
            imageQuality = 1;
            break;
    }

    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;

    ctx.drawImage(previewImage, 0, 0, canvas.width, canvas.height);

    const a = document.createElement("a");

    a.href = canvas.toDataURL("image/jpeg", imageQuality);

    a.download = `compressed-image${e.name}.jpeg`;

    a.click();

    document.querySelector(".content-2").classList.remove("active");

    previewImage.src = "images/upload-icon.svg";
}

// For image upload 

// For History 

const historyContent = document.querySelector(".history-content");

const historyData = () => {

    historyContent.innerHTML = "";

    let storageData = JSON.parse(sessionStorage.getItem("imageData")) || [];
    
    storageData.forEach(v => {
        const historyItem = document.createElement("div");
        historyItem.classList.add("history-item");

        historyItem.innerHTML = `
          <img src="${v.imageSrc}" alt="">
                    <div class="delete-item"><i class="fas fa-trash-can"></i></div>
        `;

        historyContent.appendChild(historyItem);
    });

    const deleteItem = document.querySelectorAll(".delete-item i");

    deleteItem.forEach((v, index) => {
        v.addEventListener("click", (e) => {
            let storageData = JSON.parse(sessionStorage.getItem("imageData"));

            let parentElement = e.target.closest(".history-item");

            storageData.splice(index, 1);

            sessionStorage.setItem("imageData", JSON.stringify(storageData))

            parentElement.remove();
        })
    })
}


// For History
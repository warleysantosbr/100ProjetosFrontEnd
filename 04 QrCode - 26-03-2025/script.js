const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qrCode");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes")


dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("input", handleSize);
shareBtn.addEventListener("input", handleShare);

const defaultUrl = "https://youtube.com/WarleySantosBr";
let colorLight = "#fff", 
    colorDark = "#00",
    text = defaultUrl,
    size = 300;

function handleDarkColor(e) {
    colorDark = e.target.value;
    generateQRCode();
}

function handleLightColor(e) {
    colorLight = e.target.value;
    generateQRCode();
}

function handleQRText(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultUrl
    }
    generateQRCode();
}

async function generateQRCode() {
    qrContainer.innerHTML = "";
    new generateQRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorDark,
        colorLight,
    });
    download.href = await resolveDataUrl();
}
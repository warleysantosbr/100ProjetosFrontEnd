// Seleciona os elementos do HTML que vamos manipular
const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
};

const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            // CORRIGIDO: opção "exc-duplicate" agora define corretamente excludeDuplicate
            if (option.id === "exc-duplicate") {
                excludeDuplicate = true;
            }
            else if (option.id === "spaces") {
                staticPassword += " ";
            }
            else {
                staticPassword += characters[option.id];
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        // CORRIGIDO: o nome da variável era randomPassword, e estava sendo sobrescrita
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];

        if (excludeDuplicate) {
            if (!randomPassword.includes(randomChar) || randomChar === " ") {
                randomPassword += randomChar;
            } else {
                i--; // Tenta novamente
            }
        } else {
            randomPassword += randomChar;
        }
    }

    passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
};

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
};

updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);

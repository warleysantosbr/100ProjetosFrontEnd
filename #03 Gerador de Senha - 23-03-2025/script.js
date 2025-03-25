const lengthSlider = document.querySelector("pass-length input");
const options = document.querySelectorAll("option input");
const copyIcon = document.querySelector("input-box span");
const passwordInput = document.querySelector("input-box input");
const passIndicator = document.querySelector("generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz"
    uppercase: "ABCDEFGHIJKLMNOPQESTUVWXYZ"
    nunbers: "0123456789"
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () =>{
   let staticPassword = "",
   randomPassword = "",
   excluideDuplicade = false,
   passLength = lengthSlider.value;

   options.forEach(option =>{
    if(option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
    } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
    } else {
        excluideDuplicade = true
    }
   });


}


//https://youtu.be/825u2Puaej0?si=yPFCfuk-BG84vDL0&t=862
let userInput = document.querySelector(".result");
let buttons = document.querySelectorAll(".buttons");
let allClear = document.querySelector("#allClearBtn");

function clearClickHandler() {
    return userInput.value = "";
}
    
function buttonsClickHandler(){
    console.log("clicked");
}

allClear.addEventListener("click" , clearClickHandler);

buttons.addEventListener("click" , buttonsClickHandler);
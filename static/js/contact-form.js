function ready(f){
    /in/.test(document.readyState) ? setTimeout('ready(' + f + ')', 9) : f()
}

ready(function(){
    const formElement = document.getElementById("contact-form");
    const buttonElement = document.getElementById("send-form-button");

    formElement.addEventListener("botpoison-challenge-start", function () {
        buttonElement.setAttribute("disabled", "disabled");
    });

    formElement.addEventListener("botpoison-challenge-success", function () {
        buttonElement.removeAttribute("disabled");
    });

    formElement.addEventListener("botpoison-challenge-error", function () {
        buttonElement.removeAttribute("disabled");
    });
});

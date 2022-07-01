$( document ).ready(function() {
    const formElement = $("#contact-form");
    const buttonElement = $("#send-form-button");

    formElement.on("botpoison-challenge-start", function () {
        buttonElement.attr("disabled", "disabled");
    });

    formElement.on("botpoison-challenge-success", function () {
        buttonElement.removeAttr("disabled");
    });

    formElement.on("botpoison-challenge-error", function () {
        buttonElement.removeAttr("disabled");
    });
});

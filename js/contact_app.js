(function loadContactForm() {
    var contactFormFields = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        message: document.getElementById("message"),
        submitButton: document.getElementById("submitcontactform"),
    };
    var formMessages = document.getElementById("form-messages");

    contactFormFields.submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        var contactFormRequest = new XMLHttpRequest();
        var contactFormRequestData;

        if (typeof HtmlSanitizer !== "undefined") {
            //Sanitize output with HtmlSanitizer - https://github.com/jitbit/HtmlSanitizer
            contactFormRequestData = "name=" + HtmlSanitizer.SanitizeHtml(contactFormFields.name.value) + "&email=" + HtmlSanitizer.SanitizeHtml(contactFormFields.email.value) + "&message=" + HtmlSanitizer.SanitizeHtml(contactFormFields.message.value);
        } else {
            contactFormRequestData = "name=" + contactFormFields.name.value + "&email=" + contactFormFields.email.value + "&message=" + contactFormFields.message.value;
        }

        contactFormRequest.open("post", "email_contact_form.php");
        contactFormRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        contactFormRequest.onload = function () {

            if (contactFormRequest.status === 200) {
                //Success
                formMessages.classList.remove("alert");
                formMessages.classList.remove("alert-danger");
                formMessages.classList.remove("alert-dismissible");
                formMessages.classList.add("alert");
                formMessages.classList.add("alert-success");
                formMessages.classList.add("alert-dismissible");
                formMessages.innerText = contactFormRequest.responseText;
                document.getElementById("submitcontactform").style.display = "none";
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("message").value = "";
            } else {
                //Fail
                console.log("ERROR - FORM EMAIL NOT SENT");
                formMessages.classList.remove("alert");
                formMessages.classList.remove("alert-success");
                formMessages.classList.remove("alert-dismissible");
                formMessages.classList.add("alert");
                formMessages.classList.add("alert-danger");
                formMessages.classList.add("alert-dismissible");
                formMessages.innerText = contactFormRequest.responseText;
            }
        }
        contactFormRequest.onerror = function () {
            //Server Error
            console.log("Server Error - FORM EMAIL NOT SENT");
            formMessages.classList.remove("alert");
            formMessages.classList.remove("alert-success");
            formMessages.classList.remove("alert-dismissible");
            formMessages.classList.add("alert");
            formMessages.classList.add("alert-danger");
            formMessages.classList.add("alert-dismissible");
            formMessages.innerText = contactFormRequest.responseText;
        }
        contactFormRequest.send(contactFormRequestData);
    });
}());


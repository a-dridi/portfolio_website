$(function () {
    var form = $('#email-contact-form');
    var formMessages = $('#form-messages');

    // event listener for the contact form
    $(form).submit(function (event) {
        // Stop the browser from submitting the form
        event.preventDefault();

        // Serializing the form data.
        var formData = $(form).serialize();
        //Submit form through AJAX
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function (response) {
            // Add sucess message class to the formmessages Div
            $(formMessages).removeClass('alert alert-danger alert-dismissible')
            $(formMessages).addClass('alert alert-success alert-dismissible')
            //Setting the message text
            $(formMessages).text(response)
            //clear the contact form
            $("#name").val('');
            $("#emal").val('');
            $("#message").val('');
        }).fail(function (data) {
            // Add error message class to the formmessages Div
            $(formMessages).removeClass('alert alert-success alert-dismissible');
            $(formMessages).addClass('alert alert-danger alert-dismissible');
            // Set the message text.
            if (data.responseText !== '') {
                if ((data.responseText).length > 20) {
                    //Sending php emails does not work on this server
                    $(formMessages).text('' + data.responseText);
                } else {
                    $(formMessages).text(' ' + data.responseText);
                }
            } else {
                $(formMessages).text('Sorry. An error occured and your message could not be sent. Please check your entered values or try again later.');
            }
        });
    });

});

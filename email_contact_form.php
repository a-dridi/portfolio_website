<?php
    //Process POST reqeusts only
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the fields of the contact form and remove any whitespace
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);

		/* Captcha check start **/
	
		$captcharesponse = $_POST['formcheckedall'];
		 $data = array(
            'secret' => "XXXXXXXXXXX",
            'response' => $_POST['formcheckedall']
        );        
        $verifyCaptcha = curl_init();
        curl_setopt($verifyCaptcha, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
        curl_setopt($verifyCaptcha, CURLOPT_POST, true);
        curl_setopt($verifyCaptcha, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($verifyCaptcha, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($verifyCaptcha, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($verifyCaptcha);       

		if($response!=true){
		  http_response_code(400);
		  echo "Captcha forgotten! You did not submit the recaptcha (captcha box) -- Das Ausfüllen des Captchas wurde vergessen. Bitte füllen Sie das Captcha (reCaptcha) aus. ";
		  exit;
		}
		//* Captcha check end **/

        // Check that data was sent to the mail script (email_contact_form.php)
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) HTTP response code and exit
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again. - Hoppla! Es gab ein Problem mit Ihrer Einreichung. Bitte füllen Sie das Formular aus und versuchen Sie es erneut. ";
            exit;
        }

        // Set the recipient email address
        $recipient_var = "admin@arXXXXXXnet";
        // Setting the email subject
        $subject_var = "ard Contact form Dev - New message through the contact form of the portfolio website";
        // Building the email content
        $email_content_var = "Name: $name\n";
        $email_content_var .= "Email: $email\n\n";
        $email_content_var .= "Message:\n$message\n";
        // Building the email headers
        $email_headers_var = "From: $name <$email>";

        // Sending the email
        if (mail($recipient_var, $subject_var, $email_content_var, $email_headers_var)) {
            // Set a 200 (okay) HTTP response code
            http_response_code(200);
            echo "Thank You! Your message has been sent. - Danke! Ihre Nachricht wurde versandt.";
        } else {
            // Set a 500 (internal server error) HTTP response code
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message. - Fehler! Ihre Nachricht konnte nicht versendet werden.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) HTTP response code
        http_response_code(403);
        echo "There was a problem with your submission, please try again. - Bei Ihrer Eingabe ist ein Problem aufgetreten. Bitte versuchen Sie es erneut.";
    }

?>
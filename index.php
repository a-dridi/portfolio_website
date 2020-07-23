<?php
    // Initialize the language code variable
$lc = "";
    // Check to see that the global language server variable isset()
    // If it is set, we cut the first two characters from that string
if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE']))
    $lc = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

    // Now we simply evaluate that variable to detect specific languages
if($lc == "de"){
    header("location: de.html");
    exit();
}
elseif($lc == "fr"){
    header("location: fr.html");
    exit();
}
else{ // default if language code of user is not available here
    header("location: en.html");
    exit();
}

?>

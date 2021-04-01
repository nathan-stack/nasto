<?php
$errors = array();
$data = array();

if (empty($_POST['name'])) {
    $errors['name'] = "J'aurais besoin de votre nom !";
}
if (empty($_POST['email'])) {
    $errors['email'] = "J'aurais besoin de votre email !";
}
if (empty($_POST['message'])) {
    $errors['message'] = "J'aurais besoin de votre message !";
}

if ( ! empty($errors)) {
    $data['success'] = false;
    $data['errors']  = $errors;
} else {
    $data['success'] = true;
    $data['message'] = 'Success!';

    $message = "
    <html>
        <head>
            <title>Nouveau message</title>
        </head>
        <body>
            <p>
                Nouveau message de ${_POST['name']} (${_POST['email']})
            </p>
            <p>
                Contenu du message : <br/>
                ${_POST['message']}
            </p>
        </body>

    </html>
    ";

    $destinataire = 'nathanstooss@orange.fr';
    $headers = array(
        'From' => 'Nathan Stooss <nathan@nasto.eu>',
        'Reply-To' => $name  . ' <' . $_POST['email'] . '>',
        'X-Mailer' => 'PHP/' . phpversion(),
        'MIME-Version'  => '1.0\r\n',
        'Content-Type' => 'text/html; charset=ISO-8859-1\r\n'
    );
    mail($destinataire, 'Nouveau message', $message, $headers);
}

echo json_encode($data);
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    
    // Obtener los datos del formulario
    const formData = new FormData(document.getElementById('contactForm'));

    // Realizar el envío utilizando fetch
    fetch('http://P4B10.mysql.pythonanywhere-services.com/mensajes', {
    method: 'POST',
    body: formData
    })
    .then(response => {
    if (response.ok) {
        // Ocultar formulario
        document.getElementById('contact-form').style.display = 'none'; 
        // Mostrar el mensaje de "Datos enviados"
        document.getElementById('mensajeEnviado').style.display = 'block';
        
        // Reiniciar el formulario después de 2 segundos (puedes ajustar el tiempo)
        setTimeout(function() {
        // Ocultar formulario
        document.getElementById('contact-form').reset();
        document.getElementById('contact-form').style.display = 'block'; 
        document.getElementById('mensajeEnviado').style.display = 'none';
        }, 2000);
    } else {
        throw new Error('Error al enviar los datos');
    }
    })
    .catch(error => {
    console.error('Error:', error);
    });
});



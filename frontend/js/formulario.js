//URL de Python Anyhwere: https://pablosl.pythonanywhere.com/mensajes
//URL de LocalHost: http://127.0.0.1:5000/mensajes
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevenir el envío por defecto del formulario

            // Obtener los datos del formulario
            const formData = new FormData(form);

            // Realizar el envío utilizando fetch
            fetch('http://127.0.0.1:5000/mensajes', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Respuesta del servidor:', data);

                    if (data.mensaje === 'Mensaje agregado') {
                        document.getElementById('mensajeEnviado').style.display = 'block';
                        // Reiniciar el formulario después de 2 segundos (puedes ajustar el tiempo)
                        setTimeout(function() {
                        // Ocultar formulario
                        document.getElementById('contactForm').reset();
                        document.getElementById('contactForm').style.display = 'block';  
                        document.getElementById('mensajeEnviado').style.display = 'none';  
                        document.getElementById('closeBtn').click();               
                        }, 2000); 
                        // Puedes realizar acciones adicionales aquí si es necesario
                    } else {
                        throw new Error('Error al enviar los datos');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }
});


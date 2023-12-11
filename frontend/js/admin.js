//URL de Python Anyhwere: https://pablosl.pythonanywhere.com/mensajes
//URL de LocalHost: http://127.0.0.1:5000/mensajes
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btnTraerMensajes').click();
});

document.getElementById('btnTraerMensajes').addEventListener('click', () => {
    fetch('http://127.0.0.1:5000/mensajes')
      .then(response => response.json())
      .then(datos => {
        console.log("datos", datos)
        const tablaBody = document.querySelector('#tablaMensajes tbody');
        tablaBody.innerHTML = ''; // Limpiar tabla antes de agregar nuevos datos

        // Iterar sobre los datos y agregar filas a la tabla
        datos.forEach(dato => {
          const fila = document.createElement('tr');
          let leido='';
          if (dato.leido==0){
            leido='<img src="/frontend/assets/delete-button.png" alt="Pending">';
          }
          else {
            leido='<img src="/frontend/assets/accept.png" alt="Accepted">';
          }
          if (dato.gestion==null){
            dato.gestion='-';
          }
          fila.innerHTML = `
            <td>${dato.id}</td>
            <td>${dato.asunto}</td>
            <td>${dato.email}</td>
            <td>${dato.fecha_envio}</td>
            <td>${dato.mensaje}</td>
            <td>${leido}</td>
            <td>${dato.gestion}</td>
          `;
          tablaBody.appendChild(fila);
        });
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
});

document.getElementById('formularioContacto').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    
    // Obtener los valores de los campos
    const id = document.getElementById('idInput').value;
    const gestion = document.getElementById('detalleInput').value;

    const formData = new FormData();
    formData.append('gestion', gestion); // Agregar el detalle a los datos del formulario

    fetch(`http://127.0.0.1:5000/mensajes/${id}`, {
      method: 'PUT',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      document.getElementById('btnTraerMensajes').click();
      document.getElementById('formularioContacto').reset();
      // Aquí podrías mostrar una confirmación al usuario o hacer algo con la respuesta del servidor
    })
    .catch(error => {
      console.error('Error al enviar los datos:', error);
    });
});


document.getElementById('btnEliminar').addEventListener('click', function(event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto
  // Obtener los valores de los campos
  const id = document.getElementById('idInput').value;
  fetch(`http://127.0.0.1:5000/mensajes/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta del servidor:', data);
    document.getElementById('btnTraerMensajes').click();
    document.getElementById('formularioContacto').reset();
    // Aquí podrías mostrar una confirmación al usuario o hacer algo con la respuesta del servidor
  })
  .catch(error => {
    console.error('Error al enviar los datos:', error);
  });
});

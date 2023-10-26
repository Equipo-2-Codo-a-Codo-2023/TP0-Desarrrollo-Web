const validarFormularioDeContacto = () => {
    try {
        console.log("ENTRE A VALIDACIONES DE FOMRULARIO DE CONTACTO");
        const nombre = document.querySelector('[name="nombre"]').value
        const correo = document.querySelector('[name="correo"]').value
        const comentarios = document.querySelector('textarea').value

        //RegEx para validaciones

        const nameRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
        const correoRegex = /\w+@\w+\.\w+/

        console.log("nombre", !nameRegex.test(nombre));
        console.log("correo", !correoRegex.test(correo));
        console.log("comentario", comentarios.trim() === "");

        // Validación de "nombre"
        if (!nameRegex.test(nombre)) {
            alert("Nombre solo acepta letras y espacios en blanco.");
            return false;
        }

        // Validación de "correo"
        if (!correoRegex.test(correo)) {
            alert("Formato de correo inválido.");
            return false;
        }

        // Validación de"comentarios"
        if (comentarios.trim() === "") {
            alert("Por favor, escribe tu consulta.");
            return false;
        }
    } catch (err) {
        console.log("CATCH VALIDACION DE FORMULARIO DE CONTACTO");
        return false
    }
    return true;
}



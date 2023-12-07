export const validarFormularioDeContacto = () => {
    try {
        console.log("ENTRE A VALIDACIONES DE FOMRULARIO DE CONTACTO");
        const asunto = document.querySelector('[name="asunto"]').value
        const correo = document.querySelector('[name="correo"]').value
        const consulta = document.querySelector('[name="consulta"]').value

        //RegEx para validaciones

        const nameRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
        const correoRegex = /\w+@\w+\.\w+/

        console.log("asunto", !nameRegex.test(asunto));
        console.log("correo", !correoRegex.test(correo));
        console.log("consulta", consulta.trim() === "");

        // Validación de "nombre"
        if (!nameRegex.test(asunto)) {
            alert("Asunto solo acepta letras y espacios en blanco.");
            return false;
        }

        // Validación de "correo"
        if (!correoRegex.test(correo)) {
            alert("Formato de correo inválido.");
            return false;
        }

        // Validación de"comentarios"
        if (consulta.trim() === "") {
            alert("Por favor, escribe tu consulta.");
            return false;
        }
    } catch (err) {
        console.log("CATCH VALIDACION DE FORMULARIO DE CONTACTO");
        return false
    }
    return true;
}




export const validationUser = ( { name, email, phone } ) => {
    const error = {};
    const nombre =  /^[A-Za-z]+$/;
    const correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(!nombre.test(name)) error.name = "El nombre solo puede contener letras."
    if(!correo.test(email)) error.email = "Por favor, introduce una dirección de correo válida."
    if(phone.length !== 9 || isNaN(phone)) error.phone = "Debe ser un numero telefónico y contener 9 dígitos" 

    return error

}

export const validationPlatos = ({name}) => {
    const error = {};
    const nombre =  /^[A-Za-z]+$/;

    if(!nombre.test(name)) error.name = "El nombre solo puede contener letras."

    return error
 }

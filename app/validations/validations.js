function nameLastNameValidation(data){

    const {nombre, apellidos}=data;
    //validación para nombre

    if(typeof nombre !== 'string'){
        throw new Error('name must be a string');
    }
    if(!/^[a-z\sáéíóú]+$/i.test(nombre)){
        throw new Error('name must contain only a-z characters');
    }


    //validación para apellidos

    if(typeof apellidos !== 'string'){
        throw new Error('last name must be a string');
    }
    if(!/^[a-z\sáéíóú]+$/i.test(apellidos)){
        throw new Error('last name must contain only a-z characters');
    }

}



function phoneNumberValidation(data){

    //validación para teléfono
   
    if(!/^(\+34|0034|34)?[6789]\d{8}$/i.test(data)){
        throw new Error('phone incorrect');
    }
}


module.exports ={
    nameLastNameValidation,
    phoneNumberValidation 
};
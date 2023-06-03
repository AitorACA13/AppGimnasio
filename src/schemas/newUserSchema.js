const joi = require('@hapi/joi');
const newUserSchema = joi.object().keys({
  email: joi
    .string()
    .email()
    .required()
    .error((errors) => {
      if (errors[0].code === 'any.required') {
        return new Error('Se requiere un email.');
      } else {
        return new Error('El email no es valido');
      }
    }),
  password: joi
    .string()
    .min(8)
    .max(100)
    .regex(
      /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[¡!$%^&()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .error((errors) => {
      if (errors[0].code === 'any.required') {
        return new Error('Se requiere una contraseña.');
      } else if (errors[0].code === 'string.pattern.base') {
        return new Error(
          'La contraseña no es valida. Requiere una mayúscula, una minúscula y un caracter especial'
        );
      } else {
        return new Error('La constraseña debe tener entre 8 y 100 carácteres.');
      }
    }),
});

module.export = newUserSchema;

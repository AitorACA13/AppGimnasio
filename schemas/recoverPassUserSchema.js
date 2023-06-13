const joi = require('joi');
//
const recoverPassUserSchema = joi.object().keys({
  recoverPassCode: joi.string().length(8).required(),
  newPass: joi
    .string()
    .min(8)
    .max(100)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-=_+{};':"|,.<>/?`~]).*$/)
    .error((errors) => {
      switch (errors[0].code) {
        case 'any.required':
          return new Error('Se requiere una contraseña');

        case 'string.pattern.base':
          return new Error(
            'La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un signo de puntuación'
          );

        default:
          return new Error('La contraseña debe tener entre 8 y 100 caracteres');
      }
    }),
});

module.exports = recoverPassUserSchema;

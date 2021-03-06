const Joi = require('joi');
const i18n = require('i18n');


const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "date.max":
                err.message = i18n.__('validationMessage.minimalAge');
                break;
            case "any.only":
                err.message = i18n.__('validationMessage.repeatPassword');
                break;
            case "date.base":
                err.message = i18n.__('validationMessage.dateFormat');
                break;
            case "string.pattern.base":
                err.message = i18n.__('validationMessage.notNumber');
                break;
            case "string.empty":
                err.message = i18n.__('validationMessage.fieldRequired');
                break;
            case "string.min":
                err.message = i18n.__('validationMessage.minimumChars')+ err.local.limit + i18n.__('validationMessage.chars');
                break;

            case "string.max":
                err.message = i18n.__('validationMessage.maximumChars')+ err.local.limit + i18n.__('validationMessage.chars');
                break;
            case "string.email":
                err.message = i18n.__('validationMessage.mailFormat');
                break;
            default:
                break;
        }
    });
    return errors;
}

const playerSchema = Joi.object({

    firstName: Joi.string()
        .min(2)
        .max(60)
        .pattern(new RegExp(/^([^0-9]*)$/))
        .required()
        .error(errMessages),
    lastName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .regex(/^([^0-9]*)$/)
        .error(errMessages),
    birthDate: Joi.date()
        .required()
        .max(new Date(new Date().getFullYear()-18,new Date().getMonth(),new Date().getDay()))
        .error(errMessages),
    country: Joi.string()
        .required()
        .min(2)
        .max(60)
        .regex(/^([^0-9]*)$/)
        .error(errMessages),
    id: Joi.number()
        .allow(""),
    email: Joi.string()
        .email()
        .required()
        .error(errMessages),
    password: Joi.string()
        .required()
        .min(2)
        .max(100)
        .error(errMessages),
    repeatPassword: Joi.string()
        .min(2)
        .max(100)
        .required()
        .valid(Joi.ref('password'))
        .error(errMessages)
});

// const validationResult = playerSchema.validate({ }, { abortEarly: false });
// console.log(validationResult.error.details.map(errDetail => errDetail.type), validationResult.error);



module.exports = playerSchema;
const Joi = require('joi');
const i18n = require('i18n');


const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.isoDate":
                err.message = i18n.__('validationMessage.dateFormat');
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
        .required()
        .error(errMessages),
    lastName: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    birthDate: Joi.string()
        .required()
        .isoDate()
        .error(errMessages),
    country: Joi.string()
        .required()
        .min(2)
        .max(60)
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
});

module.exports = playerSchema;
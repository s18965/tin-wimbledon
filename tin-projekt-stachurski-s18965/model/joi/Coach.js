const Joi = require('joi');
const i18n = require('i18n');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = i18n.__('validationMessage.fieldRequired');
                break;
            case "string.min":
                err.message = i18n.__('validationMessage.minimumChars')+ err.local.limit + i18n.__('validationMessage.chars');
                break;
            case "string.max":
                err.message = i18n.__('validationMessage.maximumCharsz')+ err.local.limit  + i18n.__('validationMessage.chars');
                break;
            default:
                break;
        }
    });
    return errors;
}

const coachSchema = Joi.object({

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
    country: Joi.string()
        .allow("")
        .error(errMessages),
    id: Joi.number()
        .allow("")
        .optional(),
    idPlayer: Joi.string()
        .required()
        .error(errMessages)
});

module.exports = coachSchema;
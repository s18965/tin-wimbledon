const Joi = require('joi');
const i18n = require('i18n');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = i18n.__('validationMessage.fieldRequired');
                break;
            case "any.required":
                err.message = i18n.__('validationMessage.fieldRequired');
                break;
            case "string.pattern.base":
                err.message = i18n.__('validationMessage.notNumber');
                break;
            case "string.min":
                err.message = i18n.__('validationMessage.minimumChars')+ err.local.limit + i18n.__('validationMessage.chars');
                break;
            case "string.max":
                err.message = i18n.__('validationMessage.maximumChars')+ err.local.limit  + i18n.__('validationMessage.chars');
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
        .pattern(new RegExp(/^([^0-9]*)$/))
        .required()
        .error(errMessages),
    lastName: Joi.string()
        .min(2)
        .max(60)
        .pattern(new RegExp(/^([^0-9]*)$/))
        .required()
        .error(errMessages),
    country: Joi.string()
        .allow("")
        .pattern(new RegExp(/^([^0-9]*)$/))
        .error(errMessages),
    id: Joi.number()
        .allow("")
        .optional(),
    idPlayer: Joi.string()
        .required()
        .error(errMessages)
});

module.exports = coachSchema;
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
            case "any.required":
                err.message = i18n.__('validationMessage.fieldRequired');
                break;
            case "date.base":
                err.message = i18n.__('validationMessage.dateFormat');
                break;
            case "string.pattern.base":
                err.message = i18n.__('validationMessage.wrongFormat');
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

    court: Joi.string()
        .min(2)
        .max(60)
        .pattern(new RegExp(/^([^0-9]*)$/))
        .required()
        .error(errMessages),
    roundNumber: Joi.number()
        .min(1)
        .max(7)
        .required()
        .error(errMessages),
    idPlayer1: Joi.number()
        .required()
        .error(errMessages),
    idWinner: Joi.number()
        .required()
        .error(errMessages),
    idPlayer2: Joi.number()
        .required()
        .error(errMessages),
    scorePlayer1:Joi.string()
        .pattern(new RegExp(/^\d,\d,\d$/))
        .allow("")
        .error(errMessages),
    scorePlayer2:Joi.string()
        .pattern(new RegExp(/^\d,\d,\d$/))
        .allow("")
        .error(errMessages),
    id: Joi.number()
        .allow(""),
    date: Joi.date()
        .required()
        .error(errMessages),
});

module.exports = playerSchema;
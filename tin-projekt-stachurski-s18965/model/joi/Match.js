const Joi = require('joi');
const i18n = require('i18n');


const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = i18n.__('validationMessage.fieldRequired');
                break;
            case "string.isoDate":
                err.message = i18n.__('validationMessage.dateFormat');
                break;
            case "string.min":
                err.message = i18n.__('validationMessage.minimumChars')+ err.local.limit + i18n.__('validationMessage.chars');
                break;
            case "string.max":
                err.message = i18n.__('validationMessage.maximumChars')+ err.local.limit + i18n.__('validationMessage.chars');
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
        .min(2)
        .max(60)
        .allow("")
        .error(errMessages),
    scorePlayer2:Joi.string()
        .min(2)
        .max(60)
        .allow("")
        .error(errMessages),
    id: Joi.number()
        .allow(""),
    date: Joi.string()
        .required()
        .isoDate()
        .error(errMessages),
});

module.exports = playerSchema;
const Joi = require('joi');


const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.isoDate":
                err.message = `Data powinna być w formacie yyyy-mm-dd`;
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
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
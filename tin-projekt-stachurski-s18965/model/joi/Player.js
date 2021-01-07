const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.isoDate":
                err.message = `Data powinna być w formacie yyyy-mm-dd`;
                break;
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            case "string.email":
                err.message = `Pole powinno zawierać prawidłowy adres email`;
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
function validateForm() {
    
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const countryInput = document.getElementById('country');
const dateInput = document.getElementById('date');

const errorDate = document.getElementById('errorDate');
const errorFirstName = document.getElementById('errorFirstName');
const errorLastName = document.getElementById('errorLastName');
const errorCountry = document.getElementById('errorCountry');
const errorsSummary = document.getElementById('errorsSummary');

resetErrors([firstNameInput, lastNameInput, countryInput,dateInput], [errorFirstName, errorLastName, errorCountry,errorDate], errorsSummary);

let valid = true;

if (!checkRequired(firstNameInput.value)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "Pole jest wymagane";
} else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
}

if (!checkRequired(lastNameInput.value)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Pole jest wymagane";
} else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
}

if (!checkRequired(countryInput.value)) {
    valid = false;
    countryInput.classList.add("error-input");
    errorCountry.innerText = "Pole jest wymagane";
} else if (!checkTextLengthRange(countryInput.value, 2, 60)) {
    valid = false;
    countryInput.classList.add("error-input");
    errorCountry.innerText = "Pole powinno zawierać od 2 do 60 znaków";
}

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dateInput.value, nowString)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Data nie może być z przyszłości";
    }


if (!valid) {
    errorsSummary.innerText = "Formularz zawiera błędy";
}
return valid;

}


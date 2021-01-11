function validateForm() {
    
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const countryInput = document.getElementById('country');
const dateInput = document.getElementById('birthDate');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const errorDate = document.getElementById('errorDate');
const errorFirstName = document.getElementById('errorFirstName');
const errorLastName = document.getElementById('errorLastName');
const errorCountry = document.getElementById('errorCountry');
const errorsSummary = document.getElementById('errorsSummary');
const errorEmail = document.getElementById('errorEmail');
const errorPassword = document.getElementById('errorPassword');


const reqMessage = document.getElementById('errorMessage-required').innerText;
const mailMessage = document.getElementById('errorMessage-mailFormat').innerText;
const dateMessage = document.getElementById('errorMessage-dateFormat').innerText;
const futureMessage = document.getElementById('errorMessage-futureDate').innerText;
const formMessage = document.getElementById('errorMessage-form').innerText;
const charsMessage = document.getElementById('errorMessage-charsUniversal').innerText;
const signsMessage = document.getElementById('errorMessage-signs').innerText;

resetErrors([firstNameInput, lastNameInput, countryInput,dateInput, emailInput, passwordInput], [errorFirstName, errorLastName, errorCountry,errorDate, errorEmail, errorPassword], errorsSummary);

let valid = true;
const min=2;
const max=60;
const lengthErrorMessage=charsMessage + min +'-'+max +signsMessage;

if (!checkRequired(firstNameInput.value)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = reqMessage;
} else if (!checkTextLengthRange(firstNameInput.value, min, max)) {
    valid = false;
    firstNameInput.classList.add("error-input");
    errorFirstName.innerText = lengthErrorMessage;
}

if (!checkRequired(lastNameInput.value)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = reqMessage;
} else if (!checkTextLengthRange(lastNameInput.value, min, max)) {
    valid = false;
    lastNameInput.classList.add("error-input");
    errorLastName.innerText = lengthErrorMessage;
}

if (!checkRequired(countryInput.value)) {
    valid = false;
    countryInput.classList.add("error-input");
    errorCountry.innerText = reqMessage;
} else if (!checkTextLengthRange(countryInput.value, min, max)) {
    valid = false;
    countryInput.classList.add("error-input");
    errorCountry.innerText = lengthErrorMessage;
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
        errorDate.innerText = reqMessage;
    } else if (!checkDate(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = dateMessage;
    } else if (checkDateIfAfter(dateInput.value, nowString)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = futureMessage;
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = mailMessage;
    }

    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    }

if (!valid) {
    errorsSummary.innerText = formMessage;
}
return valid;

}


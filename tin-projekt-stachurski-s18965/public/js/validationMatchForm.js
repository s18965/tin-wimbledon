function validateForm() {

    const player1Input = document.getElementById('player');
    const player2Input = document.getElementById('rival');
    const dateInput = document.getElementById('date');
    const placeInput = document.getElementById('court');
    const roundInput = document.getElementById('roundNumber');

    const errorPlayer1 = document.getElementById('errorPlayer1');
    const errorPlayer2 = document.getElementById('errorPlayer2');
    const errorDate = document.getElementById('errorDate');
    const errorPlace = document.getElementById('errorPlace');
    const errorRound = document.getElementById('errorRound');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([player1Input, player2Input, dateInput,placeInput,roundInput], [errorPlayer1, errorPlayer2, errorDate,errorPlace,errorRound], errorsSummary);

    let valid = true;

    if (!checkRequired(player1Input.value)) {
        valid = false;
        player1Input.classList.add("error-input");
        errorPlayer1.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(player2Input.value)) {
        valid = false;
        player2Input.classList.add("error-input");
        errorPlayer2.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(placeInput.value)) {
        valid = false;
        placeInput.classList.add("error-input");
        errorPlace.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(roundInput.value)) {
        valid = false;
        roundInput.classList.add("error-input");
        errorRound.innerText = "Pole jest wymagane";
    } else if (!checkNumber(roundInput.value)) {
        valid = false;
        roundInput.classList.add("error-input");
        errorRound.innerText = "Pole powinno być liczbą";
    }else if (!checkNumberRange(roundInput.value, 1, 7)) {
        valid = false;
        roundInput.classList.add("error-input");
        errorRound.innerText = "Pole powinno być liczbą w zakresie od 1 do 7";
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


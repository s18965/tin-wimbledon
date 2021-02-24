function validateForm() {

    const player1Input = document.getElementById('player');
    const player2Input = document.getElementById('rival');
    const winnerInput = document.getElementById('winner');
    const dateInput = document.getElementById('date');
    const placeInput = document.getElementById('court');
    const roundInput = document.getElementById('roundNumber');
    const scorePlayer1Input = document.getElementById('scorePlayer1');
    const scorePlayer2Input = document.getElementById('scorePlayer2');


    const errorPlayer1 = document.getElementById('errorPlayer1');
    const errorPlayer2 = document.getElementById('errorPlayer2');
    const errorWinner = document.getElementById('errorWinner');
    const errorDate = document.getElementById('errorDate');
    const errorPlace = document.getElementById('errorPlace');
    const errorRound = document.getElementById('errorRound');
    const errorsSummary = document.getElementById('errorsSummary');
    const errorScore1 = document.getElementById('errorScore1');
    const errorScore2 = document.getElementById('errorScore2');


    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const dateMessage = document.getElementById('errorMessage-dateFormat').innerText;
    const formMessage = document.getElementById('errorMessage-form').innerText;
    const charsMessage = document.getElementById('errorMessage-charsUniversal').innerText;
    const signsMessage = document.getElementById('errorMessage-signs').innerText;
    const extentMessage = document.getElementById('errorMessage-extent').innerText;
    const numberMessage = document.getElementById('errorMessage-number').innerText;
    const notNumberMessage = document.getElementById('errorMessage-notNumber').innerText;
    const wrongFormatMessage = document.getElementById('errorMessage-wrongScoreFormat').innerText;


    resetErrors([player1Input, player2Input,scorePlayer1Input, scorePlayer2Input, winnerInput, dateInput,placeInput,roundInput], [errorPlayer1, errorPlayer2, errorScore1, errorScore2, errorWinner,errorDate,errorPlace,errorRound], errorsSummary);

    let valid = true;
    const minSign=2;
    const maxSign=60;
    const minRound=1;
    const maxRound=7;
    const lengthErrorMessage=charsMessage + minSign +'-'+maxSign +' '+ signsMessage;

    if (!checkRequired(player1Input.value)) {
        valid = false;
        player1Input.classList.add("error-input");
        errorPlayer1.innerText = reqMessage;
    }

    if (!checkRequired(player2Input.value)) {
        valid = false;
        player2Input.classList.add("error-input");
        errorPlayer2.innerText = reqMessage;
    }

    if (!checkRequired(placeInput.value)) {
        valid = false;
        placeInput.classList.add("error-input");
        errorPlace.innerText = reqMessage;
    }else if (!checkTextLengthRange(placeInput.value, minSign, maxSign)) {
        valid = false;
        placeInput.classList.add("error-input");
        errorPlace.innerText = lengthErrorMessage;
    }else if (hasNumber(placeInput.value)) {
        valid = false;
        placeInput.classList.add("error-input");
        errorPlace.innerText = notNumberMessage;
    }

    if (scorePlayer1Input.value!="" && !checkScore(scorePlayer1Input.value)) {
        valid = false;
        scorePlayer1Input.classList.add("error-input");
        errorScore1.innerText=wrongFormatMessage;
    }

    if (scorePlayer2Input.value!="" && !checkScore(scorePlayer2Input.value)) {
        valid = false;
        scorePlayer2Input.classList.add("error-input");
        errorScore2.innerText=wrongFormatMessage;
    }


    if (!checkRequired(roundInput.value)) {
        valid = false;
        roundInput.classList.add("error-input");
        errorRound.innerText = reqMessage;
    } else if (!checkNumber(roundInput.value)) {
        valid = false;
        roundInput.classList.add("error-input");
        errorRound.innerText = numberMessage;
    }else if (!checkNumberRange(roundInput.value, minRound, maxRound)) {
        valid = false;
        roundInput.classList.add("error-input");
        errorRound.innerText = numberMessage + ' ' + extentMessage + ' '+minRound+'-'+maxRound;
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
    }

    if (!checkRequired(winnerInput.value)) {
        valid = false;
        winnerInput.classList.add("error-input");
        errorWinner.innerText = reqMessage;
    }


    if (!valid) {
        errorsSummary.innerText = formMessage;
    }
    return valid;

}


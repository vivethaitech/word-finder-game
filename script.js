const words = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "AntiguaandBarbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burma", "Burundi", "Cambodia",
    "Cameroon", "Canada", "Chad", "Chile", "China", "Colombia", "Cyprus", "Danzig",
    "Denmark", "Djibouti", "Dominica", "Ecuador", "Egypt", "Estonia", "Ethiopia", "Fiji",
    "Finland", "France", "Gabon", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
    "Guatemala", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Morocco", "Mozambique", "Namibia",
    "Nauru", "Nepal", "Newfoundland", "Netherlands", "NewZealand", "Nicaragua", "Niger",
    "Nigeria", "Oman", "OttomanEmpire", "Pakistan", "Palau", "Panama", "Norway",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Rwanda",
    "SaudiArabia", "Samoa", "Senegal", "Serbia", "Seychelles", "SierraLeone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "SouthAfrica", "Spain",
    "SriLanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tibet", "Tobago", "Togo", "TrinidadandTobago",
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "UnitedArabEmirates",
    "UnitedKingdom", "UnitedStates", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela",
    "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];
const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
const wordDisplay = document.getElementById('word-display');
const message = document.getElementById('message');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const result = document.getElementById('result');

let sample = Array(word.length).fill('');
let remainingAttempts = word.length + 3;
let correctGuesses = 0;

function createBoxes() {
    wordDisplay.innerHTML = '';
    sample.forEach(() => {
        const box = document.createElement('div');
        box.className = 'letter-box';
        wordDisplay.appendChild(box);
    });
}

function updateDisplay() {
    const boxes = document.querySelectorAll('.letter-box');
    sample.forEach((letter, index) => {
        boxes[index].textContent = letter;
        if (letter !== '') {
            boxes[index].classList.add('correct');
        }
    });
}

function endGame(win) {
    guessInput.disabled = true;
    guessButton.disabled = true;
    if (win) {
        result.textContent = `You win! The word was "${word}".`;
    } else {
        result.textContent = `You lose! The word was "${word}".`;
    }
}

guessButton.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = '';
    message.textContent = '';

    if (!/^[a-z]$/.test(guess)) {
        message.textContent = 'Enter only a single alphabet.';
        return;
    }

    if (sample.includes(guess)) {
        message.textContent = 'Already guessed.';
        return;
    }

    if (word.includes(guess)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                sample[i] = guess;
                correctGuesses++;
            }
        }
        updateDisplay();
        if (correctGuesses === word.length) {
            endGame(true);
        }
    } else {
        remainingAttempts--;
        if (remainingAttempts === 0) {
            endGame(false);
        } else {
            message.textContent = 'Wrong guess, try again.';
        }
    }
});

createBoxes();
updateDisplay();

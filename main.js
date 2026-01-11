const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generateBtn = document.querySelector('.generate-btn');

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers);
}

function displayLottoNumbers() {
    const numbers = generateLottoNumbers();
    lottoNumbersContainer.innerHTML = '';
    numbers.forEach(number => {
        const numberEl = document.createElement('span');
        numberEl.textContent = number;
        lottoNumbersContainer.appendChild(numberEl);
    });
}

generateBtn.addEventListener('click', displayLottoNumbers);

displayLottoNumbers();

const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generateBtn = document.querySelector('.generate-btn');
const themeToggle = document.querySelector('.theme-toggle');
const todayDateEl = document.querySelector('.today-date');
const drawDateEl = document.querySelector('.draw-date');

const THEME_STORAGE_KEY = 'lotto-theme';

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

function formatDate(date) {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short',
    }).format(date);
}

function setDrawInfo() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
    const drawDate = new Date(today);
    drawDate.setDate(today.getDate() + daysUntilSaturday);

    if (todayDateEl) {
        todayDateEl.textContent = formatDate(today);
    }
    if (drawDateEl) {
        drawDateEl.textContent = `${formatDate(drawDate)} 밤`;
    }
}

setDrawInfo();

function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
        return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    themeToggle.textContent = `Mode: ${isDark ? 'Dark' : 'Light'}`;
    themeToggle.setAttribute('aria-pressed', String(isDark));
}

applyTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
});

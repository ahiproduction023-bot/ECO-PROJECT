let score = 0;
let currentQuestion = 0;
let quizScore = 0;

const quizData = [
    { q: "Сортируете ли вы мусор дома?", a: ["Да, всегда", "Иногда", "Нет"], points: [10, 5, 0] },
    { q: "Используете ли вы пластиковые пакеты в магазине?", a: ["Никогда", "Редко", "Всегда"], points: [10, 5, 0] },
    { q: "Куда вы сдаете батарейки?", a: ["В спец. пункты", "Коплю", "В мусор"], points: [10, 5, 0] },
    { q: "Участвуете в субботниках?", a: ["Да", "Редко", "Нет"], points: [10, 5, 0] },
    { q: "Экономите воду?", a: ["Да", "Стараюсь", "Нет"], points: [10, 5, 0] }
];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function checkCity(val) {
    const otherInput = document.getElementById('otherCityInput');
    otherInput.style.display = (val === 'other') ? 'block' : 'none';
}

function login() {
    const nick = document.getElementById('nickInput').value;
    const citySelect = document.getElementById('citySelect').value;
    const otherCity = document.getElementById('otherCityInput').value;
    let finalCity = citySelect === 'other' ? otherCity : citySelect;

    if(nick && (citySelect !== 'other' || otherCity)) {
        document.getElementById('displayNick').innerText = nick;
        showPage('map');
    } else {
        alert("Заполните все поля!");
    }
}

function uploadAndEarn(taskId, pts) {
    const fileInput = document.getElementById('file' + taskId);
    if (fileInput.files.length > 0) {
        score += pts;
        updateScores();
        alert(`Задание выполнено! +${pts} баллов.`);
        fileInput.value = "";
    } else { alert("Прикрепите фото!"); }
}

function updateScores() {
    document.getElementById('userScore').innerText = score;
    document.getElementById('tableScore').innerText = score;
}

function buyItem(cost, itemName) {
    if (score >= cost) {
        score -= cost;
        updateScores();
        alert(`Вы приобрели: ${itemName}`);
    } else {
        alert("Недостаточно баллов!");
    }
}

// ВОТ ЗДЕСЬ ИСПРАВЛЕНО НА ТВОИ ФОТО:
function showProblem(type) {
    const detail = document.getElementById('problemDetail');
    detail.style.display = 'block';
    if(type === 'park') {
        document.getElementById('probTitle').innerText = "Свалка в парке";
        document.getElementById('probImg').src = "park.jpg"; // Твоё исходное фото
    } else {
        document.getElementById('probTitle').innerText = "Грязная река";
        document.getElementById('probImg').src = "river.jpg"; // Твоё исходное фото
    }
}

function startQuiz() {
    currentQuestion = 0;
    quizScore = 0;
    showQuestion();
}

function showQuestion() {
    const container = document.getElementById('question-area');
    const data = quizData[currentQuestion];
    let html = `<p><b>Вопрос ${currentQuestion + 1}:</b> ${data.q}</p>`;
    data.a.forEach((ans, index) => {
        html += `<button onclick="nextQuestion(${data.points[index]})">${ans}</button>`;
    });
    container.innerHTML = html;
}

function nextQuestion(pts) {
    quizScore += pts;
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const container = document.getElementById('question-area');
    let level = quizScore >= 40 ? "🌳 Эко-Герой!" : quizScore >= 20 ? "🌱 Эко-Активист." : "👶 Новичок.";
    container.innerHTML = `<h3>Результат: ${quizScore}</h3><p>${level}</p><button onclick="startQuiz()">Заново</button>`;
}
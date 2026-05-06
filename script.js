let score = 0;
let userNick = "Ты";
let currentQuestion = 0;
let quizScore = 0;

// Список других участников
const players = [
    { name: "GreenMaster", score: 950 },
    { name: "EcoWarrior", score: 820 },
    { name: "Aktobe_Clean", score: 750 },
    { name: "NatureLover", score: 610 },
    { name: "Almaty_Eco", score: 540 },
    { name: "ZeroWaste", score: 490 },
    { name: "RecycleHero", score: 430 },
    { name: "GreenCity", score: 380 },
    { name: "EcoFriend", score: 310 },
    { name: "PlantTree", score: 250 },
    { name: "CleanRiver", score: 180 },
    { name: "TazaStep", score: 90 }
];

const quizData = [
    { q: "Сортируете ли вы мусор дома?", a: ["Да", "Иногда", "Нет"], points: [10, 5, 0] },
    { q: "Используете ли вы пластиковые пакеты?", a: ["Никогда", "Редко", "Всегда"], points: [10, 5, 0] },
    { q: "Куда вы сдаете батарейки?", a: ["В пункты", "Коплю", "В мусор"], points: [10, 5, 0] }
];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    // Если открыли рейтинг — обновляем таблицу с учетом новых баллов
    if (pageId === 'rating') {
        updateRatingTable();
    }
}

function login() {
    const nick = document.getElementById('nickInput').value;
    if(nick) {
        userNick = nick;
        showPage('map');
    } else {
        alert("Заполните никнейм!");
    }
}

function checkCity(val) {
    document.getElementById('otherCityInput').style.display = (val === 'other') ? 'block' : 'none';
}

// Задание 1: Фото
function uploadAndEarn(taskId, pts) {
    const fileInput = document.getElementById('file' + taskId);
    if (fileInput.files.length > 0) {
        addPoints(pts, "Фото отправлено!");
        fileInput.value = "";
    } else { alert("Прикрепите фото!"); }
}

// Задание 2: Адрес (+30)
function submitAddress() {
    const addr = document.getElementById('addressInput').value;
    if (addr.trim().length > 5) {
        addPoints(30, "Адрес принят!");
        document.getElementById('addressInput').value = "";
    } else {
        alert("Введите корректный адрес!");
    }
}

// Задание 3: Команда (+50)
function submitTeam() {
    const input = document.getElementById('teamInput').value;
    // Разбиваем строку по запятым и фильтруем пустые имена
    const members = input.split(',').map(m => m.trim()).filter(m => m !== "");
    
    if (members.length >= 4) {
        addPoints(50, `Команда из ${members.length} чел. создана!`);
        document.getElementById('teamInput').value = "";
    } else {
        alert("Нужно минимум 4 человека (через запятую)!");
    }
}

function addPoints(pts, msg) {
    score += pts;
    document.getElementById('userScore').innerText = score;
    alert(msg + " +" + pts + " баллов.");
}

// Исправленный рейтинг: Сортировка по баллам
function updateRatingTable() {
    const tbody = document.getElementById('ratingBody');
    tbody.innerHTML = ""; 

    // Создаем общий массив (ты + боты)
    let allPlayers = [...players, { name: userNick, score: score, isUser: true }];

    // Сортируем: чем больше баллов, тем выше место
    allPlayers.sort((a, b) => b.score - a.score);

    allPlayers.forEach((player, index) => {
        const row = document.createElement('tr');
        if (player.isUser) row.className = 'user-row';

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.isUser ? '<b>' + player.name + ' (Вы)</b>' : player.name}</td>
            <td>${player.score}</td>
        `;
        tbody.appendChild(row);
    });
}

function buyItem(cost, itemName) {
    if (score >= cost) {
        score -= cost;
        document.getElementById('userScore').innerText = score;
        alert(`Куплено: ${itemName}`);
    } else { alert("Маловато баллов!"); }
}

function showProblem(type) {
    const detail = document.getElementById('problemDetail');
    detail.style.display = 'block';
    if(type === 'park') {
        document.getElementById('probTitle').innerText = "Свалка в парке";
        document.getElementById('probImg').src = "park.jpg"; 
    } else {
        document.getElementById('probTitle').innerText = "Грязная река";
        document.getElementById('probImg').src = "river.jpg";
    }
}

// Тест
function startQuiz() {
    currentQuestion = 0; quizScore = 0;
    showQuestion();
}

function showQuestion() {
    const container = document.getElementById('question-area');
    const data = quizData[currentQuestion];
    let html = `<p>${data.q}</p>`;
    data.a.forEach((ans, i) => {
        html += `<button onclick="nextQuestion(${data.points[i]})">${ans}</button>`;
    });
    container.innerHTML = html;
}

function nextQuestion(pts) {
    quizScore += pts;
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        document.getElementById('question-area').innerHTML = `<h3>Ваш эко-результат: ${quizScore}</h3><button onclick="startQuiz()">Заново</button>`;
    }
}

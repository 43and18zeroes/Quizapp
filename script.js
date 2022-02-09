let questions = [
    {
        "question": "Wer sind die Freunde von der Maus?",
        "answer_1": "Tim und Struppi",
        "answer_2": "Bart und Lisa",
        "answer_3": "Elefant und Ente",
        "answer_4": "Oger und Drache",
        "right_answer": 3
    },
    {
        "question": "Wer ist der größte Widersacher der Schlümpfe?",
        "answer_1": "Die Hexe von Oz",
        "answer_2": "Gargamel",
        "answer_3": "Mr. Bubbletea",
        "answer_4": "Ronald McDonald",
        "right_answer": 2
    },
    {
        "question": "Krtek heißt auf deutsch...",
        "answer_1": "Maulwurf",
        "answer_2": "Karotte",
        "answer_3": "Kohlrübe",
        "answer_4": "Mozarella",
        "right_answer": 1
    },
    {
        "question": "Wie bringt das Sandmännchen die Kinder zum schlafen?",
        "answer_1": "Es spielt ihnen ein Hörbuch vor",
        "answer_2": "Es erzählt eine Geschichte",
        "answer_3": "Es streut ihnen Schlafsand in die Augen",
        "answer_4": "Es überfüttert sie mit Ofenkäse",
        "right_answer": 3
    },
    {
        "question": "Wo lebt Spongebob Schwammkopf",
        "answer_1": "Auf dem Meeresgrund",
        "answer_2": "Auf dem Mount Everest",
        "answer_3": "Auf dem Mond",
        "answer_4": "Auf dem schaurigen Berg",
        "right_answer": 1
    },
    {
        "question": "Welche Haarfarbe hat der Pumuckl?",
        "answer_1": "Blond",
        "answer_2": "Grün",
        "answer_3": "Blau",
        "answer_4": "#CD341A",
        "right_answer": 4
    }
];

let colorClasses = ["bg-success", "bg-danger"];

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/right.mp3');
let AUDIO_FAIL = new Audio('audio/wrong.mp3');

function init() {
    $("questionsnumber").innerHTML = questions.length;

    showQuestion();
}


function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndscreen() {
    $('endscreen').style.display = '';
    $('quizbody').style.display = 'none';
    $('questions-number-result').innerHTML = questions.length;
    $('amount-of-right-questions').innerHTML = rightQuestions;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];

    $('currentquestionnumber').innerHTML = currentQuestion + 1;
    $("questiontext").innerHTML = question['question'];
    $("answer_1").innerHTML = question['answer_1'];
    $("answer_2").innerHTML = question['answer_2'];
    $("answer_3").innerHTML = question['answer_3'];
    $("answer_4").innerHTML = question['answer_4'];
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length * 100;
    percent = Math.round(percent);
    $('progress-bar').innerHTML = `${percent} %`;
    $('progress-bar').style = `width: ${percent}%`;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        answerSuccess(selection);
    } else {
        answerFailure(selection, idOfRightAnswer);
    }

    $("next-button").disabled = false;
}

function answerSuccess(selection) {
    $(selection).parentNode.classList.add('bg-success');
    AUDIO_SUCCESS.play();
    rightQuestions++;
}

function answerFailure(selection, idOfRightAnswer) {
    $(selection).parentNode.classList.add('bg-danger');
    $(idOfRightAnswer).parentNode.classList.add('bg-success');
    AUDIO_FAIL.play();
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer']
}

function nextQuestion() {
    currentQuestion++;
    $("next-button").disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    for (let index = 1; index < questions.length - 1; index++) {
        const element = $(`answer_${index}`);
        element.parentNode.classList.remove(colorClasses[0]);
        element.parentNode.classList.remove(colorClasses[1]);
    }
}

function restartGame() {
    $('quizbody').style.display = '';
    $('endscreen').style.display = 'none';

    rightQuestions = 0;
    currentQuestion = 0;

    init();
}

function $(id) {
    return document.getElementById(id);
}
let questionnumber = 0;
let numPoints = 0;
let questions = [];

function fetchJSONData() {
    fetch('./questions_answers.json')
        .then((res) => res.json())
        .then((data) => {
            questions=data.questions
        })
}
fetchJSONData();

function continueQuestions() {
    questionnumber++;
    if (questionnumber === questions.length+1) {
        document.getElementById("Quiz").innerHTML = '<h4>You got ' + numPoints + ' out of 15 questions correct.</h4> <h3>Thanks for taking the quiz!</h3>'
    }
    else {
        let selectionBox = document.createElement('select');
        selectionBox.id = 'selectionBox';
        let options = [];

        for (let option in questions[questionnumber-1].options) {
            options.push(questions[questionnumber-1].options[option]);
        }

        for (const option of options) {
            let optionElement = document.createElement('option');
            optionElement.textContent = option;
            selectionBox.appendChild(optionElement);
        }

        document.getElementById("questionNum").innerHTML = "Question " + questionnumber;
        document.getElementById("questionText").innerHTML = questions[questionnumber-1].question + '<br>';
        document.getElementById("questionText").appendChild(selectionBox);
        document.getElementById("nextButton").setAttribute("onclick", "nextQuestion()");
        document.getElementById("nextButton").textContent = "Next";
    }
}

function nextQuestion() {
    let answer = document.getElementById("selectionBox").value;
    let isCorrect = checkAnswer(answer)
        
    if (isCorrect) {
        numPoints++;
        document.getElementById("questionNum").innerHTML = "";
        document.getElementById("questionText").innerHTML = "Correct";
        document.getElementById("nextButton").setAttribute("onclick", "continueQuestions()");
    }
    else {
        document.getElementById("questionNum").innerHTML = "";
        document.getElementById("questionText").innerHTML = "Incorrect";
        document.getElementById("nextButton").setAttribute("onclick", "continueQuestions()");
    }
}

function checkAnswer(answer) {
    let correctAnswer = questions[questionnumber-1].answer;
    if (answer == correctAnswer) {
        return true;
    }
    else {
        return false;
    }
}
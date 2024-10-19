let questionnumber = 0;
let numPoints = 0;
let questions = [];

function initiate() {
    const quizHtml = `
        <div id="quiz">
            <h1 id="questionNum">Quiz App</h1>
            <p id="questionText">Welcome to the quiz app. Select the quiz you want to take and click "Start Quiz".</p>
            <div id="quizzes">
                <div id="specificQuiz">
                    <select id="quizSelect">
                        <option value="Logic Quiz">Logic Quiz</option>
                    </select>
                    <br>
                    <button id="startButton1">Start Quiz</button>
                </div>
                <div id="specificQuiz">
                    <select id="quizSelect">
                        <option value="Misc. Math Quiz">Misc. Math Quiz</option>
                        <option value="Fractions Quiz">Fractions Quiz</option>
                        <option value="Decimals Quiz">Decimals Quiz</option>
                        <option value="Percents Quiz">Percents Quiz</option>
                    </select>
                    <br>
                    <button id="startButton2">Start Quiz</button>
                </div>
                <br>
            </div>
        </div>
    `;
    document.body.innerHTML = quizHtml;
    
    document.getElementById("startButton1").addEventListener('click', () => startQuestions(0));
    document.getElementById("startButton2").addEventListener('click', () => startQuestions(1));
}
window.onload = initiate;

function startQuestions(quizNum) {
    let quizSelection = document.querySelectorAll("#quizSelect")[quizNum].value
    fetch('./questions_answers.json')
        .then((res) => res.json())
        .then((data) => {
            const quizMap = {'Logic Quiz': data.logic, 'Misc. Math Quiz': data.miscmath, 'Fractions Quiz': data.fractions,
                'Decimals Quiz': data.decimals, 'Percents Quiz': data.percents}
            questions = quizMap[quizSelection]
            document.getElementById("quizzes").remove()
            document.getElementById("quiz").innerHTML += `<button id="nextButton" onclick=nextQuestion()>Next</button>`
            continueQuestions();
        }
    )
}

function continueQuestions() {
    questionnumber++;
    if (questionnumber === questions.length+1) {
        document.getElementById("quiz").innerHTML = `<h4>You got ${numPoints} out of ${questions.length} questions correct.</h4> <h3>Thanks for taking the quiz!</h3>`
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

        document.getElementById("questionNum").innerHTML = `Question ${questionnumber}`;
        document.getElementById("questionText").innerHTML = `${questions[questionnumber-1].question} <br>`;
        generateImages(questions[questionnumber-1].question_urls)
        document.getElementById("questionText").appendChild(selectionBox);
        document.getElementById("nextButton").setAttribute("onclick", "nextQuestion()");
    }
}

function nextQuestion() {
    let answer = document.getElementById("selectionBox").value;
    let isCorrect = checkAnswer(answer)
    let explanation = questions[questionnumber-1].explanation
    let explanationText = document.createElement('p')
    explanationText.innerHTML = '<b>Explanation: </b>' + explanation
        
    document.getElementById("questionNum").innerHTML = "";
    if (isCorrect) {
        numPoints++;
        document.getElementById("questionText").innerHTML = "Correct";
    }
    else {
        document.getElementById("questionText").innerHTML = `Incorrect <br> <b>The correct answer is: </b> ${questions[questionnumber-1].answer}`;
    }

    document.getElementById("questionText").appendChild(explanationText);
    generateImages(questions[questionnumber-1].image_urls);
    document.getElementById("nextButton").setAttribute("onclick", "continueQuestions()");
}

function generateImages(whichImages) {
    let images = []
    images = whichImages

    if (images !== undefined) {
        for (let i = 0; i < images.length; i++) {
            let img = document.createElement('img')
            let caption = document.createElement('figcaption')
            img.src = images[i];
            caption.textContent = "Figure " + (i+1)
            document.getElementById("questionText").appendChild(img)
            document.getElementById("questionText").appendChild(caption)
        }
    }
}

function checkAnswer(answer) {
    let correctAnswer = questions[questionnumber-1].answer;
    if (answer === correctAnswer) {
        return true;
    }
    else {
        return false;
    }
}
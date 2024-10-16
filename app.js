let questionnumber = 0;
let numPoints = 0;
let questions = [];

function startQuestions(quizNum) {
    let quizSelection = document.querySelectorAll("#quizSelect")[quizNum].value
    fetch('./questions_answers.json')
        .then((res) => res.json())
        .then((data) => {
            if (quizSelection === 'Logic Quiz') {
                questions = data.logic
            }
            else if (quizSelection === 'Misc. Math Quiz') {
                questions = data.miscmath
            }
            else if (quizSelection === 'Fractions Quiz') {
                questions = data.fractions
            }
            else if (quizSelection === 'Decimals Quiz') {
                questions = data.decimals
            }
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
        let images = [];

        for (let option in questions[questionnumber-1].options) {
            options.push(questions[questionnumber-1].options[option]);
        }

        for (const option of options) {
            let optionElement = document.createElement('option');
            optionElement.textContent = option;
            selectionBox.appendChild(optionElement);
        }

        if ('question_urls' in questions[questionnumber-1]) {
            for (let image in questions[questionnumber-1].question_urls) {
              images.push(questions[questionnumber-1].question_urls[image])
            }
          }

        document.getElementById("questionNum").innerHTML = `Question ${questionnumber}`;
        document.getElementById("questionText").innerHTML = `${questions[questionnumber-1].question} <br>`;
        for (let i = 0; i < images.length; i++) {
            let img = document.createElement('img')
            img.src = images[i];
            document.getElementById("questionText").appendChild(img)
            document.getElementById("questionText").innerHTML += `<br>`
        }
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
    let images = []

    if ('image_urls' in questions[questionnumber-1]) {
      for (let image in questions[questionnumber-1].image_urls) {
        images.push(questions[questionnumber-1].image_urls[image])
      }
    }
        
    document.getElementById("questionNum").innerHTML = "";
    if (isCorrect) {
        numPoints++;
        document.getElementById("questionText").innerHTML = "Correct";
    }
    else {
        document.getElementById("questionText").innerHTML = `Incorrect <br> <b>The correct answer is: </b> ${questions[questionnumber-1].answer}`;
    }

    document.getElementById("questionText").appendChild(explanationText);
    for (let i = 0; i < images.length; i++) {
        let img = document.createElement('img')
        let caption = document.createElement('figcaption')
        img.src = images[i];
        caption.textContent = "Figure " + (i+1)
        document.getElementById("questionText").appendChild(img)
        document.getElementById("questionText").appendChild(caption)
    }
    document.getElementById("nextButton").setAttribute("onclick", "continueQuestions()");
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
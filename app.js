let questionnumber = 0;

function continueQuestions() {
    questionnumber++;
    if (questionnumber == 11) {
        document.getElementById("Quiz").innerHTML = '<h5>Thanks for taking the quiz!</h5>'
    }
    else {
        document.getElementById("questionNum").innerHTML = "Question " + questionnumber;
        document.getElementById("questionText").innerHTML = "Insert Question Here" + '<br>' + "The answer is " + '<input type="text" class="answerBox">' + "and other answer is " + '<input type="text" class="answerBox">';
        document.getElementById("nextButton").setAttribute("onclick", "nextQuestion()");
        document.getElementById("nextButton").textContent = "Next";
    }
}

function nextQuestion() {
    let answer1 = document.getElementsByClassName("answerBox")[0].value;
    let answer2 = document.getElementsByClassName("answerBox")[1].value;
    if (answer1 != "" && answer2 != "") {
        let isCorrect = checkAnswer(answer1, answer2)
        
        if (isCorrect) {
            document.getElementById("questionNum").innerHTML = "";
            document.getElementById("questionText").innerHTML = "Correct!";
            document.getElementById("nextButton").setAttribute("onclick", "continueQuestions()");
        }
        else {
            document.getElementById("questionNum").innerHTML = "";
            document.getElementById("questionText").innerHTML = "Incorrect";
            document.getElementById("nextButton").setAttribute("onclick", "continueQuestions()");
        }
    }

    else {
        alert("Please enter an answer!");
    }
}

function checkAnswer(answer1, answer2) {
    if (answer1 == "1" && answer2 == "1") {
        return true;
    }
    else {
        return false;
    }
}
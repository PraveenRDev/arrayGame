window.onload = init  

// GLOBAL VARIABLES
let playerName = "";
let correctAnswersQId = [];
let wrongAnswersQId = [];
let timeTaken = 0;

// COMMON METHODS TO USE
const validateString = str => str && str.trim().length > 0 && isNaN(str);
const hideElement = elemId =>  document.getElementById(elemId).style.visibility = "hidden";
const unHideElement = elemId => document.getElementById(elemId).style.visibility = "visible";
const removeElement = elemId => document.getElementById(elemId).style.display = "none";
const showElement = elemId => document.getElementById(elemId).style.display = "block";


const processSummaryPage = () => {
    removeElement("game");
    showElement("frame-summary");
    localStorage.setItem("currentPage", 6);

    if(localStorage.getItem("correctAnswersQId")){
        correctAnswersQId = JSON.parse(localStorage.getItem("correctAnswersQId"));
    }

    const btnEnd = document.getElementById("end");

    const retry = () => {
        window.localStorage.removeItem("currentPage")
        window.localStorage.removeItem("playerName")
        window.localStorage.removeItem("correctAnswersQId")
        location.reload();
    }

    btnEnd.onclick = retry

    let htmlString = "";

    questions_list.forEach((question, i) => {
        htmlString += `
        <div ${correctAnswersQId.includes(question.id) ? `class="question-block correct"`: `class="question-block wrong"`}>
            <h3 class="summary-question-heading">${i + 1}) ${question.question}</h3>
            ${question.codeBlock ? `<p class="code-block summary-cd">${question.codeBlock}</p>`: ''}
            <p class="summary-question-answer">Ans: ${question.correctAnswer}</p>
            <p class="summary-question-explaination">Explaination: ${question.answerExplaination}</p>
        </div>
        `
    })
    document.getElementById("frame-summary-container").innerHTML = htmlString;
}

const processGamePage = () => {
    // mount page
    removeElement("frame-instructions");
    showElement("game");
    hideElement("answer-warning");
    localStorage.setItem("currentPage", 5);

    setInterval(() => {
        timeTaken++;
    }, 1000)

    // variables
    const arrQuestion = document.getElementById("arr_question");
    const arrQuestionCode = document.getElementById("arr_question-cb");
    const answer1 = document.getElementById("ans1");
    const answer2 = document.getElementById("ans2");
    const answer3 = document.getElementById("ans3");
    const answer4 = document.getElementById("ans4");
    const nextButton = document.getElementById("next");

    const questionsAsked = [];
    let indexOfCorrectAnswer;

    // utility
    const randomizeArray = arr => arr.sort(() => 0.5 - Math.random());

    // get a random index - to choose a random question
    let randomQuestionIndex = Math.floor(Math.random() * 10);

    const endGame = () => {
        window.clearInterval();
        removeElement("question-case");
        showElement("frame-end");
        const endTitle = document.getElementById("end-title");
        const endPragraph = document.getElementById("end-paragraph");
        const imgReward = document.getElementById("img-reward");
        const btnSummary = document.getElementById("summary");
        localStorage.setItem("correctAnswersQId", JSON.stringify(correctAnswersQId));

        btnSummary.onclick = () => {
            processSummaryPage()
        }


        endTitle.textContent=`Score: ${correctAnswersQId.length}/10 | Inquiry Time: ${(timeTaken / 60).toFixed(2)}min`;

        if(wrongAnswersQId.length === 5){
            // loose
            endPragraph.textContent=`OOOPS! ${playerName}, Officials found you to be guilty of the case and the capital punnishment is given to you.`
            imgReward.src="./assets/images/handcuff.png";
            
        }else {
            // win
            endPragraph.textContent= `WOOWW! Excellent Job, Dear ${playerName}, You have proved to the officials that they are wrong! You are a real JS PRO.`
            imgReward.src="./assets/images/achievement_transperant.png";
        }
    }
    
    const handleHangman = () => {

        if(wrongAnswersQId.length === 1){
            unHideElement("hg_right-leg")
        } else if(wrongAnswersQId.length === 2){
            unHideElement("hg_left-leg")
        } else if(wrongAnswersQId.length === 3){
            unHideElement("hg_left-hand")
        }else if(wrongAnswersQId.length === 4){
            unHideElement("hg_right-hand")
        }else if(wrongAnswersQId.length === 5){
            unHideElement("hg_head")
        }
    }

    // configure next button
    nextButton.onclick = e => {
        console.log(timeTaken)
        e.preventDefault();
        const answer = document.querySelector('input[name="answer"]:checked') ? Number(document.querySelector('input[name="answer"]:checked').value) : null;
        
        if(answer !== null){
            if(answer === indexOfCorrectAnswer){
                correctAnswersQId.push(questions_list[randomQuestionIndex].id);
            }else {
                wrongAnswersQId.push(questions_list[randomQuestionIndex].id);
                handleHangman();
            }

            if(wrongAnswersQId.length >= 5 || questionsAsked.length >= 10){
                endGame()
            }else {
                showQuestion()
            }
        }else{ 
            unHideElement("answer-warning")
        }
    } 

    // handle validation
    document.getElementsByName("answer").forEach(ans => {
        ans.addEventListener("click", () => {
            if(document.getElementById("answer-warning").style.visibility === "visible"){
                hideElement("answer-warning");
                }
            })
    })


    // show single Question
    const showQuestion = () => {

        if(document.querySelector('input[name="answer"]:checked')){
            document.querySelector('input[name="answer"]:checked').checked = false
        }
        
        // generate a randomQuestion that's not yet asked
        while(questionsAsked.indexOf(randomQuestionIndex) >= 0){
            randomQuestionIndex = Math.floor(Math.random() * 10);
        }
        questionsAsked.push(randomQuestionIndex);
        // show question
        arrQuestion.textContent = questions_list[randomQuestionIndex].question;
        // show code block - if there's one
        if(questions_list[randomQuestionIndex].codeBlock){
            showElement("arr_question-cb");
            arrQuestionCode.textContent = questions_list[randomQuestionIndex].codeBlock
        } else {
            removeElement("arr_question-cb");
        }
        // show answers
        const randomizeAnswers = randomizeArray(questions_list[randomQuestionIndex].answers);
        answer1.textContent = randomizeAnswers[0]
        answer2.textContent = randomizeAnswers[1]
        answer3.textContent = randomizeAnswers[2]
        answer4.textContent = randomizeAnswers[3]
 
        // get the correct answer's index from randomized answers
        indexOfCorrectAnswer = randomizeAnswers.indexOf(questions_list[randomQuestionIndex].correctAnswer)
    }

    if((questionsAsked.length) === 0){
        showQuestion()
    }

}

const processInstructionsPage = () => {
    removeElement("frame-notes");
    showElement("frame-instructions");
    localStorage.setItem("currentPage", 4);
    document.getElementById("player-name_instruction").textContent = playerName;
    const today = new Date();
    const play = document.getElementById("play");
    
    document.getElementById("show-date").textContent = `${today.getDate()}-${today.getMonth() < 9 ? '0'+today.getMonth() : today.getMonth() + 1}-${today.getFullYear()}`;
    play.onclick = (e) => {
        processGamePage();
    }
}

const processNotesPage = () => {
    removeElement("frame-story");
    showElement("frame-notes");
    localStorage.setItem("currentPage", 3);
    const startGame = document.getElementById("start-game");
    startGame.onclick = (e) => {
        processInstructionsPage()
    }
}

const processStoryLine = () => {
    removeElement("frame-intro");
    showElement("frame-story");
    localStorage.setItem("currentPage", 2);
    document.getElementById("playerName").textContent = playerName;
    const btn_ready = document.getElementById("ready");
    const btn_notes = document.getElementById("refer-notes");
    
    btn_ready.onclick = () => {
        removeElement("frame-story");
        processInstructionsPage();
    }
    
    btn_notes.onclick = () => {
        processNotesPage();
    }
    
}

const processIntroduction = () => {
    removeElement("frame-summary")
    showElement("frame-intro");
    hideElement("name-warning");
    const nameForm = document.getElementById("name-form");
    const name = document.getElementById("name");
    localStorage.setItem("currentPage", 1);
    
    nameForm.addEventListener("submit", e => {
        e.preventDefault();
        if(validateString(name.value)){
            hideElement("name-warning");
            playerName = name.value.toUpperCase();
            localStorage.setItem("playerName", playerName)
            processStoryLine();
        } else {
            unHideElement("name-warning")
        }
    })
    
    name.addEventListener("input", e => {
        if(document.getElementById("name-warning").style.visibility = "visible"){
            hideElement("name-warning");
        }
    })
    
}

function init() {
    if(localStorage.getItem("playerName")){
        playerName = localStorage.getItem("playerName")
    }

    switch(Number(localStorage.getItem("currentPage"))){
        case 1:
            processIntroduction()
            break;
        case 2:
            processStoryLine()
            break;
        case 3:
            processNotesPage();
            break;
        case 4: 
            processInstructionsPage()
            break;
        case 5: 
            processGamePage()
            break;
        case 6:
            processSummaryPage();
            break;
        default: 
            processIntroduction();
    }
}

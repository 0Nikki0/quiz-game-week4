const questionText = document.getElementById('question'); 
const optionsContainer = document.querySelector('.options-area'); 
const nextButton = document.querySelector('.next-button button'); 
const timerElement = document.getElementById('time');

let currentQuestionIndex = 0; 
let score = 0; 
let questions = []; 
let timer;
let timeLimit = 10;

async function fetchQuestions() { 
    try { 
        const response = await fetch('/questions'); 
        const data = await response.json(); 
        questions = data; 
        loadNextQuestion(); 
    } catch (error) { 
        console.error('Error fetching questions:', error); 
    } 
}

function startTimer(){
    let timeLeft = timeLimit;
    timerElement.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            loadNextQuestion(); 
        }
    }, 1000);
}

function loadNextQuestion() { 
    if (currentQuestionIndex < questions.length) { 
        clearInterval(timer);
        startTimer();
        const question = questions[currentQuestionIndex]; 
        questionText.textContent = question.question; 
        optionsContainer.innerHTML = ''; 

        question.options.forEach((option) => { 
            const button = document.createElement('button'); 
            button.style.display = 'inline-flex'
            button.style.backgroundColor = '#e1f2f4';
            button.style.borderRadius = '20px';
            button.style.padding = '10px';
            button.style.margin = '10px';
            button.textContent = option; 
            button.onclick = () => checkAnswer(option, question.answer); 
            optionsContainer.appendChild(button); 
        }); 

        currentQuestionIndex++; 
        nextButton.disabled = true; 
    } else { 
        displayScore(); 
    } 
} 

function checkAnswer(selectedAnswer, correctAnswer) { 
    clearInterval(timer);
    if (selectedAnswer === correctAnswer) { 
        score++; 
    } 
    nextButton.disabled = false; 
} 

function displayScore() { 
    questionText.textContent = 'Quiz Completed!'; 
    optionsContainer.innerHTML = ''; 
    nextButton.style.display = 'none'; 
    const finalScore = document.createElement('p'); 
    finalScore.textContent = `Your final score is ${score}`; 
    optionsContainer.appendChild(finalScore); 
} 

nextButton.addEventListener('click', loadNextQuestion); 

fetchQuestions();

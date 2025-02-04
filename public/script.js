const scoreElement = document.getElementById('score');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

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

function loadNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';

    question.options.forEach((option) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.onclick = () => checkAnswer(option, question.answer);
      optionsContainer.appendChild(button);
    });

    currentQuestionIndex++;
  } else {
    displayScore();
  }
}

function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    score++;
    scoreElement.textContent = score;
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

fetchQuestions();

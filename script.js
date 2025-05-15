let quizContent = [];
let currentGroup = 0;
let currentQuestion = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
  fetch('content.json')
    .then(res => res.json())
    .then(data => {
      quizContent = data;
      document.getElementById('startBtn').addEventListener('click', () => {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        loadGroup();
      });
    });
});

function loadGroup() {
  if (currentGroup >= quizContent.length) {
    document.body.innerHTML = `
      <div id="quiz-container">
        <h2>Your Final Score: ${score}</h2>
      </div>
    `;
    return;
  }

  currentQuestion = 0;
  const group = quizContent[currentGroup];
  document.getElementById('paragraph').innerText = group.paragraph;
  loadQuestion();
}

function loadQuestion() {
  const group = quizContent[currentGroup];
  const questions = group.questions;

  if (currentQuestion >= questions.length) {
    currentGroup++;
    loadGroup();
    return;
  }

  const questionObj = questions[currentQuestion];
  const questionText = document.getElementById('question');
  const optionsDiv = document.getElementById('options');

  questionText.innerText = questionObj.question;
  optionsDiv.innerHTML = '';

  questionObj.options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option;
    button.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(button);
  });
}

function checkAnswer(selected) {
  const correct = quizContent[currentGroup].questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
    document.getElementById('score-display').innerText = score;
  }
  currentQuestion++;
  loadQuestion();
}

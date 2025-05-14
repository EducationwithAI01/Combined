let quizData = [];
let currentQuestion = 0;
let score = 0;

fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    quizData = data;
    loadQuestion();
  });

function loadQuestion() {
  if (currentQuestion >= quizData.length) {
    document.body.innerHTML = `
      <div id="quiz-container">
        <h2>Your Final Score: ${score}</h2>
      </div>
    `;
    return;
  }

  const questionObj = quizData[currentQuestion];
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
  const correctAnswer = quizData[currentQuestion].answer;
  if (selected === correctAnswer) {
    score++;
    document.getElementById('score-display').innerText = score;
  }
  currentQuestion++;
  loadQuestion();
}

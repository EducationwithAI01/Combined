let quizData = [];
let currentQuestion = 0;
let score = 0;

// Load quiz data but don't start yet
fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    quizData = data;
    // Wait for start button
    document.getElementById('startBtn').onclick = () => {
      document.getElementById('intro').style.display = 'none';
      document.getElementById('quiz-container').style.display = 'block';
      loadQuestion();
    };
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

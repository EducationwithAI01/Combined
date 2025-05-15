let currentQuizIndex = 0;
let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const currentQuiz = questionsData[currentQuizIndex];
  const questionData = currentQuiz.questions[currentQuestionIndex];
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");

  questionEl.textContent = questionData.question;
  optionsEl.innerHTML = "";

  questionData.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-card";
    btn.textContent = option;

    btn.addEventListener("click", () => {
      // Disable all buttons
      document.querySelectorAll(".option-card").forEach(b => b.disabled = true);

      const isCorrect = option === questionData.answer;
      if (isCorrect) {
        btn.classList.add("correct");
        score++;
      } else {
        btn.classList.add("incorrect");
        document.querySelectorAll(".option-card").forEach(b => {
          if (b.textContent === questionData.answer) {
            b.classList.add("correct");
          }
        });
      }

      // Move to next question after a short delay
      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuiz.questions.length) {
          loadQuestion();
        } else {
          currentQuizIndex++;
          if (currentQuizIndex < questionsData.length) {
            currentQuestionIndex = 0;
            loadParagraph();
            loadQuestion();
          } else {
            showScore();
          }
        }
      }, 1000);
    });

    optionsEl.appendChild(btn);
  });
}

function showScore() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = `<h2>Your score: ${score}/${getTotalQuestions()}</h2>`;
}

function getTotalQuestions() {
  return questionsData.reduce((total, q) => total + q.questions.length, 0);
}

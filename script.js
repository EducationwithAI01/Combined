let data = [];
let currentBlock = 0;
let currentQuestion = 0;
let score = 0;

// Load JSON on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  fetch("content.json")
    .then(res => res.json())
    .then(json => {
      data = json;
      showParagraph();
    });

  document.getElementById("continueBtn").addEventListener("click", () => {
    document.getElementById("paragraph-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
  });
});

function showParagraph() {
  const para = data[currentBlock].paragraph;
  document.getElementById("paragraph-text").innerText = para;
}

function loadQuestion() {
  const questions = data[currentBlock].questions;
  if (currentQuestion >= questions.length) {
    // Next block
    currentBlock++;
    currentQuestion = 0;

    if (currentBlock >= data.length) {
      document.getElementById("quiz-container").innerHTML = `<h2>Quiz Completed! Final Score: ${score}</h2>`;
      return;
    }

    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("paragraph-container").style.display = "block";
    showParagraph();
    return;
  }

  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => {
      if (opt === q.answer) {
        score++;
        document.getElementById("score-display").innerText = score;
      }
      currentQuestion++;
      loadQuestion();
    };
    optionsDiv.appendChild(btn);
  });
}

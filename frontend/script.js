let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

fetch("http://localhost:3000/api/quiz")
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  answered = false;
  nextBtn.style.display = "none";
  optionsEl.innerHTML = "";
  scoreEl.innerText = "";

  const q = questions[currentIndex];
  questionEl.innerText = q.question;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = option;

    btn.onclick = () => checkAnswer(btn, option, q.answer);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(button, selected, correct) {
  if (answered) return;
  answered = true;

  const buttons = document.querySelectorAll(".option");

  buttons.forEach(btn => {
    if (btn.innerText === correct) btn.classList.add("correct");
    if (btn.innerText === selected && selected !== correct)
      btn.classList.add("wrong");
    btn.disabled = true;
  });

  if (selected === correct) score++;

  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

function showScore() {
  questionEl.innerText = "🎉 Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  scoreEl.innerText = `Your Score: ${score} / ${questions.length}`;
}

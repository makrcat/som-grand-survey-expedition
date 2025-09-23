document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  // Buttons
  const startBtn = document.getElementById("start");
  const submitBtn = document.getElementById("submit");
  const backBtn = document.querySelectorAll(".back");
  const okBtn = document.getElementById("ok");
  // Note
  const overlay = document.getElementById("overlay");
  // Content
  const questions = document.querySelectorAll('[class^="ques"]');
  const introElements = document.querySelectorAll("h1, p, #start");
  const connect = document.getElementById("connect");
  const connectP = document.querySelectorAll("#connect p");
  const footer = document.querySelector("footer");
  // Result
  const resultDiv = document.getElementById("result");

  // App State
  let currentQuestionIndex = 0;
  let score = 0;

  // Show Note
  if (!localStorage.getItem("noteShown")) {
    overlay.style.display = "block";
  }

  // Ok Button Event Listener
  okBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    localStorage.setItem("noteShown", "true");
  });

  // Start Button Event Listener
  startBtn.addEventListener("click", () => {
    introElements.forEach((el) => (el.style.display = "none"));
    showQuestion(currentQuestionIndex);
  });

  // Show Questions Function
  function showQuestion(index) {
    questions.forEach((q) => (q.style.display = "none"));

    if (index < questions.length) {
      const currentQuestion = questions[index];
      currentQuestion.style.display = "block";

      const currentAnswers = currentQuestion.querySelectorAll("label");
      currentAnswers.forEach((answer) => {
        answer.replaceWith(answer.cloneNode(true));
      });

      const updatedAnswers = currentQuestion.querySelectorAll("label");
      updatedAnswers.forEach((answer) => {
        answer.addEventListener("click", () => {
          const selectedOption = currentQuestion.querySelector(
            'input[type="radio"]:checked'
          );
          if (selectedOption) {
            score += parseFloat(selectedOption.value);

            // Move to next question if not the last one
            if (currentQuestionIndex < questions.length - 1) {
              currentQuestionIndex++;
              setTimeout(() => {
                showQuestion(currentQuestionIndex);
              }, 300);
            }
            if (currentQuestionIndex === questions.length - 1) {
              footer.style.display = "block";
            } else {
              footer.style.display = "none";
            }
          }
        });
      });
    }
  }

  // Back Button
  backBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentQuestionIndex--;
      showQuestion(currentQuestionIndex);
    });
  });
  // Submit Button
  submitBtn.addEventListener("click", result);

  // Result
  function result() {
    questions[questions.length - 1].style.display = "none";
    footer.style.display = "none";
    resultDiv.style.display = "flex";
    connect.style.display = "block";
    connectP.forEach((p) => {
      p.style.display = "block";
    });

    const totalQuestions = questions.length;
    const maxScore = totalQuestions;
    const percentage = (score / maxScore) * 100;

    let resultMessage = "";

    if (percentage === 0) {
      resultMessage =
        "You are 100% Irish! 🇮🇪 You're so in tune with the culture, you might be a leprechaun in disguise!";
    } else if (percentage > 0 && percentage <= 25) {
      resultMessage =
        "You're not very Anti-Ireland. 🍀 Your score’s so low you might as well be sipping tea with the locals already!";
    } else if (percentage > 25 && percentage <= 50) {
      resultMessage =
        "You're a bit Anti-Ireland. You have some traits that don't fit the mold, but you'd probably be fine. 🤔";
    } else if (percentage > 50 && percentage < 100) {
      resultMessage =
        "You're quite Anti-Ireland! You're a true maverick and don't fit in at all. Maybe you should move to the moon? 🚀";
    } else if (percentage === 100) {
      resultMessage =
        "You are 100% Anti-Ireland! 🥔🍀 Scientists are baffled, sheep are gossiping about you, and even leprechauns refuse to deal with you. Truly unmatched. 👽";
    }

    resultDiv.innerHTML = `
      <h2>Quiz Complete!</h2>
      <p>Your Anti-Ireland score is: <br> ${score} out of ${maxScore}</p>
      <p>This means you are ${percentage.toFixed(0)}% Anti-Ireland</p>
      <p>${resultMessage}</p>
      <button id="restart">Try Again</button>`;

    const restart = document.getElementById("restart");
    restart.addEventListener("click", () => {
      resultDiv.style.display = "none";
      window.location.reload();
    });
  }

  // Dark/light Mode
  const toggleBtn = document.getElementById("darkModeToggle");
  const body = document.body;

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.classList.add("dark");
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    toggleBtn.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      body.classList.contains("dark-mode") ? "dark" : "light"
    );
  });
});

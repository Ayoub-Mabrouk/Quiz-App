const question = document.querySelector("#question");
// const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const choices_container = document.querySelector(".choices-container");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let answered_correctly = 0;
let questions = [];

async function getQuetions() {
  let res = await fetch("http://127.0.0.1:5500/index.json");
  let { data } = await res.json();
  return data;
}

var MAX_QUESTIONS;

startGame = async () => {
  questions = await getQuetions();
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  MAX_QUESTIONS = questions.length;
  getNewQuestion();
};
var choices = [];
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    var calculation = (answered_correctly / MAX_QUESTIONS) * 100;
    if (calculation >= 70) {
      localStorage.setItem("mostRecentScore", score);
      localStorage.setItem("percentage_score", calculation);
      return window.location.assign("/end.html");
    } else {
      return window.location.assign("/lost.html");
    }
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;
  choices = currentQuestion.choices;
  choices_container.innerHTML = "";
  choices.forEach((choice, i) => {
    var element = document.createElement("div");
    element.classList.add("choice-container");
    element.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.getAttribute("id");
      let classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      if (classToApply === "correct") {
        ++answered_correctly;
        incrementScore(currentQuestion.points);
      }

      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
    var choice_prefix = document.createElement("p");
    choice_prefix.classList.add("choice-prefix");
    choice_prefix.textContent = ++i;

    var choice_text = document.createElement("p");
    choice_text.classList.add("choice-text");
    choice_text.setAttribute("id", i);
    choice_text.textContent = choice;

    element.append(choice_prefix, choice_text);
    choices_container.append(element);
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();

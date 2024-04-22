// Array de preguntas y respuestas
const questions = [
    {
      question: "Calcula el producto de los siguientes polinomios: (x+y+1)(x+y+3)",
      options: ["x² + 4xy + 3x + 3y + 3", "x² + 2xy + 3x + 3y + 3", "x² + 4xy + 4x + 4y + 4"],
      answer: "x² + 4xy + 3x + 3y + 3"
    },
    {
      question: "Calcula el producto de los siguientes polinomios: (x+y+1)(x-y+3)",
      options: ["x² + 2xy - 3x + 3y + 3", "x² - 4xy + 3x + 3y + 3", "x² - 2xy + 3x + 3y + 3"],
      answer: "x² + 2xy - 3x + 3y + 3"
    },
    {
      question: "Calcula el producto de los siguientes polinomios: (3x-2y+3)(2x+5y-3)",
      options: ["6x² + x - 6y + 3", "6x² + x + 19y - 6", "6x² - x + 19y - 6"],
      answer: "6x² + x + 19y - 6"
    },
    {
      question: "Calcula lo siguiente: (2x^2)(5x^3+3x^5)",
      options: ["10x^5 + 6x^7", "10x^5 + 6x^10", "10x^6 + 6x^7"],
      answer: "10x^5 + 6x^7"
    },
    {
      question: "Calcula lo siguiente: -3y(x-y)",
      options: ["-3xy + 3y^2", "3xy - 3y^2", "-3xy - 3y^2"],
      answer: "-3xy + 3y^2"
    },
    {
      question: "Calcula lo siguiente: 2x(x+y)",
      options: ["2x^2 + 2xy", "2x^2 + 2y", "2x^2 + 2xy + 2y"],
      answer: "2x^2 + 2xy"
    },
    {
      question: "Calcula lo siguiente: (3x-5)(2y-4)",
      options: ["6xy - 26x - 20y + 20", "6xy - 26x + 20y - 20", "6xy - 2x - 20y + 20"],
      answer: "6xy - 26x + 20y - 20"
    },
    {
      question: "Calcula lo siguiente: (-x-2)(2y-3)",
      options: ["-2xy - 3x + 6y + 6", "-2xy + 3x - 6y - 6", "-2xy - 3x - 6y - 6"],
      answer: "-2xy - 3x + 6y + 6"
    },
    {
      question: "Calcula lo siguiente: (x+3)(3xy+2x+4y)",
      options: ["3x^2y + 6xy + 9x + 12y + 4", "3x^2y + 9xy + 6x + 12y + 4", "3x^2y + 9xy + 9x + 12y + 4"],
      answer: "3x^2y + 9xy + 6x + 12y + 4"
    },
    {
      question: "Calcula lo siguiente: (2x-1)(2x-y+3)",
      options: ["4x^2 - 2xy - x + 6x - 3", "4x^2 - 2xy + 6x - x - 3", "4x^2 - 2xy + 2x - x + 3"],
      answer: "4x^2 - 2xy + 6x - x - 3"
    }
  ];
  
  // Variable para almacenar las respuestas seleccionadas por el jugador
  const chosenAnswers = [];
  
  // Variables globales
  let currentQuestion = 0;
  let score = 0;
  
  // Función para cargar la pregunta actual
  function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const currentQuestionData = randomQuestions[currentQuestion];
  
    questionElement.textContent = currentQuestionData.question;
    optionsElement.innerHTML = "";
  
    currentQuestionData.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("btn", "btn-secondary", "mr-2");
      button.addEventListener("click", () => checkAnswer(option));
      optionsElement.appendChild(button);
    });
  }
  
  // Función para verificar la respuesta seleccionada
  function checkAnswer(selectedOption) {
    const currentQuestionData = randomQuestions[currentQuestion];
  
    // Almacenar la respuesta seleccionada
    chosenAnswers[currentQuestion] = selectedOption;
  
    if (selectedOption === currentQuestionData.answer) {
      score++;
    }
  
    currentQuestion++;
  
    if (currentQuestion < randomQuestions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
  
  // Función para mostrar el resultado final
  function showResult() {
    const quizElement = document.getElementById("quiz");
    const resultElement = document.getElementById("result");
    const scoreElement = document.getElementById("score");
    const correctAnswersElement = document.getElementById("correctAnswers");
  
    quizElement.classList.add("d-none");
    resultElement.classList.remove("d-none");
  
    scoreElement.textContent = `Puntuación: ${score}/${randomQuestions.length}`;
  
    correctAnswersElement.innerHTML = "";
    randomQuestions.forEach((question, index) => {
      const div = document.createElement("div");
      div.classList.add("question-result");
  
      const questionInfo = document.createElement("p");
      questionInfo.textContent = `Pregunta ${index + 1}: ${question.question}`;
      div.appendChild(questionInfo);
  
      const correctAnswerInfo = document.createElement("p");
      correctAnswerInfo.textContent = `Respuesta correcta: ${question.answer}`;
      div.appendChild(correctAnswerInfo);
  
      const chosenAnswerInfo = document.createElement("p");
      chosenAnswerInfo.textContent = `Tu respuesta: ${chosenAnswers[index] || 'No respondida'}`;
      div.appendChild(chosenAnswerInfo);
  
      correctAnswersElement.appendChild(div);
    });
  }
  
  // Función para seleccionar preguntas aleatorias
  function selectRandomQuestions() {
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5); // Mezcla las preguntas aleatoriamente
    return shuffledQuestions.slice(0, 3); // Selecciona las primeras tres preguntas
  }
  
  // Variable global para almacenar las preguntas seleccionadas aleatoriamente
  const randomQuestions = selectRandomQuestions();
  
  // Inicializar el quiz al hacer clic en el botón de inicio
  document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("quiz").classList.remove("d-none");
    loadQuestion();
  });
  
  // Función para reiniciar el quiz
  function restartQuiz() {
    // Reiniciar variables globales
    currentQuestion = 0;
    score = 0;
    chosenAnswers.length = 0;
    
    // Seleccionar tres preguntas aleatorias nuevamente
    randomQuestions = selectRandomQuestions();
  
    // Ocultar resultados y mostrar quiz
    document.getElementById("result").classList.add("d-none");
    document.getElementById("quiz").classList.remove("d-none");
    loadQuestion();
  
    // Cargar la primera pregunta
    loadQuestion();
  }
  
  // Event listener para el botón de reinicio
  document.getElementById("restartBtn").addEventListener("click", restartQuiz);
  
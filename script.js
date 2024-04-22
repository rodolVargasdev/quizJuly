const questions = [
    {
      question: "Calcula el producto de los siguientes polinomios: (x+y+1)(x+y+3)",
      answers: [
        { text: "x^2 + 2xy + 4x + y^2 + 4y + 3", correct: true },
        { text: "x^2 + 3x - y^2 + 3", correct: false },
        { text: "6x^2 + 11xy - 3x - 10y^2 + 21y - 9", correct: false },
        { text: "10x^5 + 6x^7", correct: false }
      ]
    },
    {
      question: "Calcula el producto de los siguientes polinomios: (x+y+1)(x-y+3)",
      answers: [
        { text: "x^2 + 2xy + 4x + y^2 + 4y + 3", correct: false },
        { text: "x^2 + 3x - y^2 + 3", correct: true },
        { text: "6x^2 + 11xy - 3x - 10y^2 + 21y - 9", correct: false },
        { text: "10x^5 + 6x^7", correct: false }
      ]
    },
    {
      question: "Calcula el producto de los siguientes polinomios: (3x-2y+3)(2x+5y-3)",
      answers: [
        { text: "x^2 + 2xy + 4x + y^2 + 4y + 3", correct: false },
        { text: "x^2 + 3x - y^2 + 3", correct: false },
        { text: "6x^2 + 11xy - 3x - 10y^2 + 21y - 9", correct: true },
        { text: "10x^5 + 6x^7", correct: false }
      ]
    },
    {
      question: "Calcula el producto de los siguientes polinomios: (2x^2)(5x^3+3x^5)",
      answers: [
        { text: "x^2 + 2xy + 4x + y^2 + 4y + 3", correct: false },
        { text: "x^2 + 3x - y^2 + 3", correct: false },
        { text: "6x^2 + 11xy - 3x - 10y^2 + 21y - 9", correct: false },
        { text: "10x^5 + 6x^7", correct: true }
      ]
    },
    {
      question: "Calcula el producto de los siguientes polinomios: -3y(x-y)",
      answers: [
        { text: "-3xy + 3y^2", correct: true },
        { text: "-x^2 + 2xy - y^2", correct: false },
        { text: "-6x^2 - 11xy + 3x + 10y^2 - 21y + 9", correct: false },
        { text: "-10x^5 - 6x^7", correct: false }
      ]
    }
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const startButton = document.getElementById('start-btn');
  
  startButton.addEventListener('click', startQuiz);
  
  function startQuiz() {
    startButton.classList.add('d-none');
    displayNextQuestion();
  }
  
  let currentQuestionIndex = 0;
  
  function displayNextQuestion() {
    resetQuiz();
    showQuestion(questions[currentQuestionIndex]);
  }
  
  function showQuestion(question) {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
      <h2>${question.question}</h2>
      <div class="btn-group-vertical" role="group">
        ${question.answers.map(answer => `<button type="button" class="btn btn-primary btn-answer">${answer.text}</button>`).join('')}
      </div>
    `;
    quizContainer.appendChild(questionElement);
  
    const answerButtons = questionElement.querySelectorAll('.btn-answer');
    answerButtons.forEach(button => {
      button.addEventListener('click', () => {
        checkAnswer(button.textContent, question);
      });
    });
  }
  
  function checkAnswer(selectedAnswer, question) {
    const correctAnswer = question.answers.find(answer => answer.correct).text;
    if (selectedAnswer === correctAnswer) {
      results.correct++;
    } else {
      results.wrong++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayNextQuestion();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    resultsContainer.classList.remove('d-none');
    resultsContainer.innerHTML = `
      <h2>Resultados:</h2>
      <p>Respuestas correctas: ${results.correct}</p>
      <p>Respuestas incorrectas: ${results.wrong}</p>
      <button class="btn btn-primary" onclick="location.reload()">Volver a Intentar</button>
    `;
  }
  
  function resetQuiz() {
    while (quizContainer.firstChild) {
      quizContainer.removeChild(quizContainer.firstChild);
    }
  }
  
  // Inicializar resultados
  const results = {
    correct: 0,
    wrong: 0
  };
  
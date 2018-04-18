let questionNumber = 1;
let score = 0;

let questions = [
  {
    question: 'Which CSS property do you use to use flexbox?',
    choices: ['position','box-sizing','content','display'],
    answer: 'display'
  },
  {
    question: 'Which flexbox property aligns items horizontally?',
    choices: ['justify-content','align-items','align-content','flex-direction'],
    answer: 'justify-content'
    
  },
  {
    question: 'Which flexbox property aligns items vertically?',
    choices: ['justify-content','align-items','align-content','flex-direction'],
    answer: 'align-items'
  },
  {
    question: "How do you align all items horizontally to the middle of a flexbox container ('justify-content')?",
    choices: ['flex-end','center','space-around','space-between'],
    answer: 'center'
  },
  {
    question: "How do you align all items vertically to the bottom of a flexbox container ('align-items')?",
    choices: ['flex-end','center','space-around','space-between'],
    answer: 'flex-end'
  },
  {
    question: "What is the correct value to use for the property 'order'",
    choices: ['numeric value','normal','reverse','none'],
    answer: 'numeric value'
  },
  {
    question: "Which is not a valid value to use for 'flex-wrap'?",
    choices: ['nowrap','wrap','reverse-wrap','wrap-reverse'],
    answer: 'reverse-wrap'
  },
  {
    question: "What two other properties does the property 'flex-flow' represent?",
    choices: ['justify-content and align-items','align-items and align-content','flex-direction and flex-wrap','justify-content and flex-direction'],
    answer: 'flex-direction and flex-wrap'
  },
  {
    question: "Which is a valid value to use for the 'align-content' property?",
    choices: ['baseline','column','wrap','stretch'],
    answer: 'stretch'
  },
  {
    question: 'Which is not a valid CSS property for flexbox?',
    choices: ['align-items','justify-content','justify-items','align-content'],
    answer: 'justify-items'
  }
];

function startQuiz() {
  $('#start-content button').on('click', function(event) {
    // Hide the start screen
    $('#start-content').addClass('hidden');
    
    // Load the first question
    loadQuestion();
    
    // Reveal the question screen
    $('#question-count, #score-count, #question-content').removeClass('hidden');
    
    // Update the question counter
    $('#question-number').text(questionNumber);
  });
}

function loadQuestion() {
  // Update the next question text
  $('#question').text(questions[questionNumber-1].question);
  
  // Iterate through and update all the next answers
  for(let i=0; i<4; i++) {
    let question = questions[questionNumber-1].choices[i];
    $(`#answer${i+1}`).html(`<input name="answer" type="radio" value="${question}" required>${question}`); 
  }
}

function checkAnswer() {
  $('#question-form').submit(function(event) {
    event.preventDefault();
    
    // Check if the answer was correct or wrong
    let answer = questions[questionNumber-1].answer;
    if($('input[name="answer"]:checked').val() === answer) {
      $('.feedback-text').text('Your answer was correct!');
      $('#feedback-button').removeClass('wrong');
      $('#feedback-button').addClass('correct');
      score++;
    } else {
      $('.feedback-text').html(`Your answer was wrong, the correct answer was <span class="bold">${answer}</span>`);
      $('#feedback-button').removeClass('correct');
      $('#feedback-button').addClass('wrong');
    }
    
    // Disable tabbing to the content behind the modal
    disableTabs();
    
    // Display the modal (feedback)
    $('#feedback-content').removeClass('hidden');
  });
}

function disableTabs() {
  $('form input, #submit-button').attr('tabindex', -1);
}

function enableTabs() {
  $('form input, #submit-button').removeAttr('tabindex');
}

function nextQuestion() {
  $('#feedback-button').on('click', function(event) {
    // Display the new score
    $('#score').text(`${score}/${questionNumber}`);
    
    
    // Load the next question
    questionNumber++;
    if(questionNumber > questions.length) {
      displayResults();
    } else {
      $('#question-number').text(questionNumber);
      loadQuestion();
    }
    
    // Hide the modal (feedback)
    enableTabs();
    $('#feedback-content').addClass('hidden');
  });
}

function displayResults() {
  if(score < 7) {
    $('#results-text').html('Sorry you did not pass the quiz. Please study up on flexbox again <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox" target="_blank">here</a> then retake the quiz.');  
  } else if(score >= 7 && score < 10) {
    $('#results-text').html('You passed! Feel free to brush up on your flexbox <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox" target="_blank">here</a> and take the quiz again to get a perfect score.')
  } else {
    $('#results-text').text('Congratulations you passed with a perfect score!');  
  }
  
  $('#question-content, #feedback-content').addClass('hidden');
  $('#results-content').removeClass('hidden');
}

function restartQuiz() {
  $('#restart-button').on('click', function(event) {
    $('#question-content, #feedback-content').addClass('hidden');
  $('#question-count, #score-count').addClass('hidden');
  
  $('#question-number').text(1);
  $('#score').text('0/0');
  
  questionNumber = 1;
  score = 0;
  
  $('#results-content').addClass('hidden');
  $('#start-content').removeClass('hidden');
  });
}

function quizHandler() {
  // Sets up an event listener to handle the start (Begin) button
  startQuiz();

  // Sets up an event listener to validate the answer when submitted
  // and display the corresponding feedback (modal)
  checkAnswer();
  
  // Sets up an event listener to update the score, load the next 
  // question (if any) or display the results screen, and hide the
  // feedback (modal)
  nextQuestion();
  
  restartQuiz();
}

$(quizHandler);
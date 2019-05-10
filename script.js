(function() {
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
  {
    question: "Who is the strongest?",
    answers: {
      a: "Superman",
      b: "The Terminator",
      c: "Waluigi, obviously"
    },
    correctAnswer: "c",
    hint:"Testing purpose - 1"
  },
  {
    question: "What is the best site ever created?",
    answers: {
      a: "SitePoint",
      b: "Simple Steps Code",
      c: "Trick question; they're both the best"
    },
    correctAnswer: "c",
    hint:"Testing purpose - 2"
  },
  {
    question: "Where is Waldo really?",
    answers: {
      a: "Antarctica",
      b: "Exploring the Pacific Ocean",
      c: "Sitting in a tree",
      d: "Minding his own business, so stop asking",
      e: "Minding his own business, so stop asking"
    },
    correctAnswer: "d",
    hint:"Testing purpose - 3"

  }
];

function buildQuiz(){
  // we'll need a place to store the HTML output
  const output = [];
  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="individualQuestion">
        <div class="question"> ${questionNumber+1})&nbsp;${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('<br/>')} </div>
        <div class="hints"><b>Explaination: </b>${currentQuestion.hint}</div><br/>
        </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}

function showResults(){

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  var elems = document.getElementsByClassName('hints');
  for (var i=0;i<elems.length;i+=1){
  console.log(elems[i]);
  elems[i].style.display = 'block';
}
  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {
    // find selected answer
    // hintContainers[questionNumber].style.display = 'block';
    const answerContainer = answerContainers[questionNumber];
    const selector = 'input[name=question'+questionNumber+']:checked';
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    // if answer is correct
    if(userAnswer===currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;
      // color the answers green
      answerContainers[questionNumber].style.color = 'green';
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  if((numCorrect/myQuestions.length)>=0.0 && (numCorrect/myQuestions.length)<=0.5)
  {
    resultsContainer.style.display='block';
    resultsContainer.style.background='linear-gradient(to right, #cb2d3e, #ef473a)';
    resultsContainer.style.color='white';
    resultsContainer.innerHTML = `<span class="text">${numCorrect} out of ${myQuestions.length} are right...</span><br/>
        You need some more practice... We suggest you to go through our portal and re-appear for the test!`;
  }
  else if((numCorrect/myQuestions.length)>0.5 && (numCorrect/myQuestions.length)<=0.75)
  {
    resultsContainer.style.display='block';
    resultsContainer.style.background='linear-gradient(to right, #00f260, #0575e6)';
    resultsContainer.style.color='white';
    resultsContainer.innerHTML = `<span class="text">${numCorrect} out of ${myQuestions.length} are right!</span><br/>
        You are capable of scoring more! We suggest you to go through our portal and re-appear for the test!`;
  }
  else if((numCorrect/myQuestions.length)>0.75 && (numCorrect/myQuestions.length)<=1)
  {
    resultsContainer.style.display='block';
    resultsContainer.style.background='linear-gradient(to right, #56ab2f, #a8e063)';
    resultsContainer.style.color='white';
    resultsContainer.innerHTML = `<span class="text">${numCorrect} out of ${myQuestions.length} are right!</span><br/>
        Whoo! Great! Go through few more sections in our portal and appear for other tests!`;

  }
  // show number of correct answers out of total
}

// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);
})();

class person {
    constructor(fname, lname, email) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
    }
}

function displayErrorMessage(inputElement, errorElementId, errorMessage) {
    const errorElement = document.getElementById(errorElementId);
    errorElement.textContent = errorMessage;
    inputElement.classList.add('error'); // Add class to the input element
}

function clearErrorMessage(inputElement, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    errorElement.textContent = '';
    inputElement.classList.remove('error'); // Remove class from the input element
}

document.getElementById("visit_info").addEventListener('submit', function (event) {
    event.preventDefault();
    //id of the inputs
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    //value of the inputs
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const email = emailInput.value;

    //first Name qualification and error message
    const namePattern = /^[A-Za-zåäöÅÄÖ]+$/;
    if (!namePattern.test(firstName)) {
        displayErrorMessage(firstNameInput, "firstNameError", "First name should contain only letters");
        return;
    }

    // last name qualificaton and error message
    if (!namePattern.test(lastName)) {
        displayErrorMessage(lastNameInput, "lastNameError", "Last name should contain only letters")
        return;
    }
    // email qualification adn error message
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        displayErrorMessage(emailInput, "emailError", "Email must have valid format")
        return;
    }

    const Person = new person(firstName, lastName, email);
    console.log(Person);

    // Hide the input container
    document.getElementById("inputContainer").style.display = "none";

    // Show the quiz container
    document.getElementById("quizContainer").style.display = "block";
});

//////////////////////////////////////////////////////////////
// start of quiz code

function checkAnswers() {
    const answerQuestion1 = document.querySelector('input[name="question1"]:checked');
    const answerQuestion2 = document.querySelector('input[name="question2"]:checked');
    const answerQuestion3 = document.querySelectorAll('input[name="question3"]:checked');
    const answerQuestion4 = document.querySelectorAll('input[name="question4"]:checked');
    const answerQuestion5 = document.querySelector('input[name="textbox1"]').value.trim().toLowerCase();
    const answerQuestion6 = document.querySelector('input[name="textbox2"]').value.trim().toLowerCase();

    if (!answerQuestion2) {
        alert("Please answer question 2");
        return;
    }

    if (answerQuestion4.length === 0) {
        alert("Please answer question 4");
        return;
    }


    // Define correct answers
    const correctAnswers = {
        question1: 'option2',
        question2: 'option2',
        question3: ['Russia', 'Turkey'],
        question4: ['Mendelevium'],
        question5: ['athena'],
        question6: ['greenland']
    };

    // Check correctness
    let correctCount = 0;

    if (answerQuestion1 && answerQuestion1.value === correctAnswers.question1) {
        correctCount++;
    }

    if (answerQuestion2 && answerQuestion2.value === correctAnswers.question2) {
        correctCount++;
    }

    const selectedAnswersQuestion3 = Array.from(answerQuestion3).map(checkbox => checkbox.value);
    const correctAnswersQuestion3 = correctAnswers.question3;

    const scoreQuestion3 = correctAnswersQuestion3.reduce((score, answer) => {
        if (selectedAnswersQuestion3.includes(answer)) {
            return score + 0.5; // Half point for each correct answer
        }
        return score;
    }, 0);
    correctCount += scoreQuestion3

    const selectedAnswersQuestion4 = Array.from(answerQuestion4).map(checkbox => checkbox.value);
    const correctAnswersQuestion4 = correctAnswers.question4;

    const scoreQuestion4 = correctAnswersQuestion4.reduce((score, answer) => {
        if (selectedAnswersQuestion4.includes(answer)) {
            return score + 1; // Half point for each correct answer
        }
        return score;
    }, 0);

    correctCount += scoreQuestion4;

    if (arraysEqual([answerQuestion5], correctAnswers.question5)) {
        correctCount++;
    }

    if (arraysEqual([answerQuestion6], correctAnswers.question6)) {
        correctCount++;
    }

    document.getElementById("results").innerHTML = ` Quiz submitted succesfully! <br> <br>Score: ${correctCount}/6 <br> <br> You got ${correctCount} correct answers out of 6 possible.`;

    
}


function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

function isQuestion4Answered() {
    const answerQuestion4 = document.querySelectorAll('input[name="question4"]:checked');
    return answerQuestion4.length > 0;
}

// submit button
document.getElementById("submitQuizButton").addEventListener('click', function () {
    checkAnswers();
});

// Checkbox function
function createCheckbox(formId, name, id, label) {
    const form = document.getElementById(formId);

    //container for the checkbox and label
    const checkboxContainer = document.createElement("div");
    checkboxContainer.style.display = "flex";
    checkboxContainer.style.alignItems = "center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.name = name;
    checkbox.value = label;

    const checkboxLabel = document.createElement("label");
    checkboxLabel.htmlFor = id;
    checkboxLabel.appendChild(document.createTextNode(label));

    // Append the checkbox and label to the container
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkboxLabel);

    // Append the container to the form
    form.appendChild(checkboxContainer);
}

createCheckbox("question3Form","question3", "Russia", "Russia");
createCheckbox("question3Form","question3", "Turkey", "Turkey");
createCheckbox("question3Form","question3", "Japan", "Japan");
createCheckbox("question3Form","question3","India", "India");

createCheckbox("question4Form","question4", "Mendelevium", "Mendelevium");
createCheckbox("question4Form","question4", "Moscovium", "Moscovium");
createCheckbox("question4Form","question4", "Meitnerium", "Meitnerium");
createCheckbox("question4Form","question4", "Mercury", "Mercury");

function createTextbox(formId, id, label) {
    const form = document.getElementById(formId);
    
    const textboxLabel = document.createElement("label");
    textboxLabel.htmlFor = id;
    textboxLabel.textContent = label;

    const textbox = document.createElement("input");
    textbox.type = "text";
    textbox.name = id;
    textbox.classList.add("textbox-size"); 
    
    form.appendChild(textboxLabel);
    form.appendChild(textbox); 

    textbox.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });

}


createTextbox("question5Form", "textbox1", "Enter your answer:");
createTextbox("question6Form", "textbox2", "Enter your answer:");



document.getElementById("correctResultsButton").addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById("answers").innerHTML = `Correct answers: <br><br>Question 1: 39 inches <br>Question 2: Venus
    <br>Question 3: Russia & Turkey <br>Question 4: Mendelevium <br>Question 5: Athena <br>Question 6: Greenland `;

});


//////////////////////////////////////////////////////////////////////
// Script to add question to the quiz starts here

function addNewQuestion(type) {
    var questionsContainer = document.getElementById('selectedAlternative');

    // makes sure that you only add one type of question at a time
    questionsContainer.innerHTML = ''; 


    // creating new elements to store in
    var newQuestion = document.createElement('div');
    newQuestion.className = 'question';

    // making the right input format depending on tyoe of question wanted
    if (type === 'button') {
        // Question with button as an answer
        newQuestion.innerHTML = 'Question: <input class="question-input" type="text" placeholder="Enter your question"><br>';
        
        // inputs for buttons
        newQuestion.innerHTML += 'Answers:<br>';
        for (let i = 1; i <= 3; i++) {
            newQuestion.innerHTML += `<input type="text" class="option-input" placeholder="Option ${i}"><br>`;
        }

        // Input for the correct option
        newQuestion.innerHTML += 'Correct Answer: <input class="question-input" type="text" placeholder="Enter the correct option">';
    } else if (type === 'checkbox') {
        // Question for  checkboxes
        newQuestion.innerHTML = 'Question: <input class="question-input" type="text" placeholder="Enter your question"><br>';
        newQuestion.innerHTML += 'Answers:<br>';

        //u Input for checkboxes
        for (let i = 1; i <= 4; i++) {
            newQuestion.innerHTML += `<input type="checkbox" id="checkbox${i}"> <input type="text" class="option-input" placeholder="Option ${i}"><br>`;
        }
        newQuestion.innerHTML += 'Correct Answer: <input class="question-input" type="text" placeholder="Enter the correct option">';
    } else if (type === 'text') {
        // Question for text
        newQuestion.innerHTML = 'Question: <input class="question-input" type="text" placeholder="Enter your question"><br>';
        // inputbox for answer,text question
        newQuestion.innerHTML += 'Correct Answer: <input class="question-input" type="text" placeholder="Enter the correct answer">';
    }

    // variable to place the new question correctly
    var inputCont = document.getElementById("userInput");

    //button to push new question to the top

    // Create the "Add Question" button
    var pushButton = document.createElement('button');
    pushButton.textContent = 'Add Question';
    pushButton.onclick = function() {
        // input values from the user
        var questionText = newQuestion.querySelector('.question-input').value;
        var answerTexts = Array.from(newQuestion.querySelectorAll('.option-input')).map(input => input.value);
        var correctAnswer = newQuestion.querySelector('.question-input[type="text"]').value;
    
        // makes a new element for the new question 
        var createdQuestion = document.createElement('div');
        createdQuestion.id = 'addedQuestion';
    
        // Setting a unique ID for each user question
        var questionId = 'Question ' + (userInput.children.length + 7);
        


        // Set up the HTML structure for the user question
        createdQuestion.innerHTML = `<h3>${questionId}</h3>`;
        createdQuestion.innerHTML += `<h4>${questionText}</h4>`;
    
        // Display the answers
        if (type === "button")
        {
            answerTexts.forEach((answer, index) => {
                createdQuestion.innerHTML += `<label><input type="radio" name="questionNew" value=${answer}>${answer}</label>`
            });
        } else if (type === "checkbox") {
            answerTexts.forEach((answer, index) => {
                createdQuestion.innerHTML += `<label><input type="checkbox" name="questionNew" value=${answer}>${answer}</label>`
            });
        } else if (type === "text") {
                createdQuestion.innerHTML += `<label>Answer: <input type="text"></label><br>`;
            };

    
       
    
        // Display the correct answer

            
        // Adding the new question to the container
        inputCont.appendChild(createdQuestion,inputCont.lastChild);
    
        // Clear the input fields in the original question
        newQuestion.querySelector('.question-input').value = '';
        newQuestion.querySelectorAll('.option-input').forEach(input => input.value = '');
        newQuestion.querySelector('.question-input[type="text"]').value = '';
        saveQuizToLocalStorage();

    
    };

    // Adding the "Add Question" button 
    newQuestion.appendChild(pushButton);

    // Adding the new question to the container
    questionsContainer.appendChild(newQuestion);

};

// function to store the quiz locally
function saveQuizToLocalStorage() {
    const userInputContainer = document.getElementById('userInput');
    const quizData = userInputContainer.innerHTML;

    // giving a key for quiz data to store with
    localStorage.setItem('myQuizData', quizData);
}


// Funtion to store new questions from local storage
function retrieveQuizFromLocalStorage() {
    const userInputContainer = document.getElementById('userInput');

    //  data from local storage
    const quizData = localStorage.getItem('myQuizData');

    // Check for saved quiz data
    if (quizData) {
        userInputContainer.innerHTML = quizData;
    }
}



// Function to remove stored questions
function removeStoredData() {
    // removes the stored data
    localStorage.removeItem('myQuizData');

    // updates the site without the stored questions
    const userInputContainer = document.getElementById('userInput');
    userInputContainer.innerHTML = '';  // Clear the content
};

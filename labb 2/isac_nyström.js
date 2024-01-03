class person{
    constructor(fname,lname,email){
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

document.getElementById("visit_info").addEventListener('submit', function(event) {
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
    if (!namePattern.test(lastName)){
        displayErrorMessage(lastNameInput,"lastNameError", "Last name should contain only letters")
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



function checkAnswers() {
    const selectedOption1 = document.querySelector('input[name="question1"]:checked');
    const selectedOption2 = document.querySelector('input[name="question2"]:checked');

    if (selectedOption1 && selectedOption2) {
        const correctAnswers = ['option2', 'option1'];
        let correctCount = 0;

        if (selectedOption1.value === correctAnswers[0]) {
            correctCount++;
        }

        if (selectedOption2.value === correctAnswers[1]) {
            correctCount++;
        }

        document.getElementById("results").textContent = `You got ${correctCount} correct answer(s).`;
    }
}

// Add the submit button event listener
document.getElementById("submitQuizButton").addEventListener('click', function () {
    checkAnswers();
});
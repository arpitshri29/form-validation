const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPass = document.getElementById('confirm-password');

// Show input error message 
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message;
}

// Show success
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Get Field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


// Check required fields
function checkRequired(inputArr){
    inputArr.forEach(function (input) {
        if(input.value.trim() === ""){
            showError(input, `${getFieldName(input)} is Required`)
        } else {
            showSuccess(input)
        }
    });
}

// Check field length
function checkLength(input, min, max){
    if (input.value.length < min || input.value.length > max){
        showError(input,`Please enter value between ${min} & ${max}`)
    } else {
        showSuccess(input)
    }
}

// Check Email
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        return showSuccess(input)
    } else {
        showError(input, 'Email not valid')
    }
}

//Check Password match
function checkPasswords(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Passwords do not match')
    }
}

// Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, confirmPass]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 12);
    checkEmail(email);
    checkPasswords(password, confirmPass);
});
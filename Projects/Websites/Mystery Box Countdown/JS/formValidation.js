const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const ytCheckbox = document.getElementById('ytCheckbox');
const fbCheckbox = document.getElementById('fbCheckbox');
const friendCheckbox = document.getElementById('friendCheckbox');
const otherCheckbox = document.getElementById('otherCheckbox');

form.addEventListener('submit', e => {
    e.preventDefault();

    // checkInputs();

    if (checkInputs() == true) {
        window.location.assign("countdown.html");
    }
});

function checkInputs() {
    // get values from inputs
    const usernameValue = username.value.trim(); //trim removes whitespaces, that way invalidates if user only uses spaces
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    const usernameConfirm = username.parentElement.className // obtains class name of username
    const emailConfirm = email.parentElement.className
    const passwordConfirm = password.parentElement.className
    const password2Confirm = password2.parentElement.className

    var invalidInputs = "";

    // validation for username
    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
        invalidInputs += "Username\n";
    } else {
        setSuccessFor(username);
    }

    // validation for email
    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
        invalidInputs += "Email\n";

    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
        invalidInputs += "Email\n";

    } else {
        setSuccessFor(email);
    }

    // validation for password
    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
        invalidInputs += "Password\n"
    } else {
        setSuccessFor(password);
    }

    // validation for password check
    if (password2Value === '') {
        setErrorFor(password2, 'Password check cannot be blank');
        invalidInputs += "Password Check\n"
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords do not match');
    } else {
        setSuccessFor(password2);
    }

    //  validation for checkbox
    var valid5 = false;

    if (document.getElementById("ytCheckbox").checked) {
        valid5 = true;
    } else if (document.getElementById("fbCheckbox").checked) {
        valid5 = true;
    } else if (document.getElementById("friendCheckbox").checked) {
        valid5 = true;
    } else if (document.getElementById("otherCheckbox").checked) {
        valid5 = true;
    }
    if (!valid5) {
        setErrorCheckbox(ytCheckbox, 'Please select at least one checkbox');
        invalidInputs += "How did you find us checkbox\n"
    } else if (valid5) {
        setSuccessCheckbox(ytCheckbox);
    }

    //  validation for radio
    var valid6 = false;
    var x = document.form.resident;
    for (var i = 0; i < x.length; i++) {
        if (x[i].checked) {
            valid6 = true;
            break;
        }
    }
    if (!valid6) {
        setErrorRadio(radioYes, "Please select one of the options above");
        invalidInputs += "Do you reside in the uk, yes or no\n"
    } else if (valid6) {
        setSuccessRadio(radioYes);
    }

    // validation for dropdown
    var valid7 = false;
    var paymentChoices = document.form.paymentMethod.value;
    if (paymentChoices === "") {
        valid7 = true;
        document.form.paymentMethod.focus();
        setErrorDropdown(payment, "Please select one");
        invalidInputs += "Preferred method of payment dropdown\n"

    } else {
        setSuccessDropdown(payment)
    }

    // validation for listbox
    var valid8 = false;
    var y = document.getElementById("delivery");
    for (var i = 0; i < y.options.length; i++) {
        if (y.options[i].selected === true) {
            valid8 = true;
        }
    }
    if (!valid8) {
        setErrorListbox(delivery, "Please select a delivery class");
        invalidInputs += "Delivery class listbox\n"
    } else if (valid8) {
        setSuccessListbox(delivery);
    }

    if (invalidInputs != "") {
        alert("You have missed the following essential elements: \n\n" + invalidInputs + "\nPlease complete and resubmit");
        return false;
    } else {
        return true;
    }

}

function setErrorFor(input, message) {
    const formControl = input.parentElement; // variable that obtains the class for the parent of input
    const small = formControl.querySelector('small'); //targets small tag which is a child form control
    formControl.className = 'form-control error'; // changes the class name so that the css can apply accordingly, in this case the error format
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'; // changes the class name so that the css can apply accordingly, in this case the success format
}

function setErrorCheckbox(input, message) {
    const formCheckbox = input.parentElement;
    const small = formCheckbox.querySelector('small');
    const iconError = document.getElementById('tempID');
    const border = document.querySelector(".form-checkbox")
    border.style.border = "2px solid #e74c3c";
    iconError.style.visibility = "visible";
    small.style.visibility = "visible";
    small.style.color = "#e74c3c";
    small.innerText = message;
}

function setSuccessCheckbox(input) {
    const formCheckbox = input.parentElement;
    const small = formCheckbox.querySelector('small');
    const iconError = document.getElementById('tempID');
    const border = document.querySelector(".form-checkbox")
    border.style.border = "2px solid #2ecc71";
    iconError.style.visibility = "hidden";
    small.style.visibility = "hidden";
}

function setErrorRadio(input, message) {
    const formRadio = input.parentElement;
    const small = formRadio.querySelector('small');
    const iconError = document.getElementById('tempID2');
    const border = document.querySelector(".form-radio")
    border.style.border = "2px solid #e74c3c";
    iconError.style.visibility = "visible";
    small.style.visibility = "visible";
    small.style.color = "#e74c3c";
    small.innerText = message;
}

function setSuccessRadio(input) {
    const formRadio = input.parentElement;
    const small = formRadio.querySelector('small');
    const iconError = document.getElementById('tempID2');
    const border = document.querySelector(".form-radio")
    border.style.border = "2px solid #2ecc71";
    iconError.style.visibility = "hidden";
    small.style.visibility = "hidden";
}

function setErrorDropdown(input, message) {
    const formDropdown = input.parentElement;
    const small = formDropdown.querySelector('small');
    const iconError = document.getElementById('tempID3');
    const border = document.querySelector(".form-dropdown")
    border.style.border = "2px solid #e74c3c";
    iconError.style.visibility = "visible";
    small.style.visibility = "visible";
    small.style.color = "#e74c3c";
    small.innerText = message;
}

function setSuccessDropdown(input) {
    const formDropdown = input.parentElement;
    const small = formDropdown.querySelector('small');
    const iconError = document.getElementById('tempID3');
    const border = document.querySelector(".form-dropdown")
    border.style.border = "2px solid #2ecc71";
    iconError.style.visibility = "hidden";
    small.style.visibility = "hidden";
}

function setErrorListbox(input, message) {
    const formListbox = input.parentElement;
    const small = formListbox.querySelector('small');
    const iconError = document.getElementById('tempID4');
    const border = document.querySelector(".form-listbox")
    border.style.border = "2px solid #e74c3c";
    iconError.style.visibility = "visible";
    small.style.visibility = "visible";
    small.style.color = "#e74c3c";
    small.innerText = message;
}

function setSuccessListbox(input) {
    const formListbox = input.parentElement;
    const small = formListbox.querySelector('small');
    const iconError = document.getElementById('tempID4');
    const border = document.querySelector(".form-listbox")
    border.style.border = "2px solid #2ecc71";
    iconError.style.visibility = "hidden";
    small.style.visibility = "hidden";
}


function isEmail(email) {
    // regex to validate email
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// function clearForm() {
//     document.getElementById("form").reset();
//     // var formControl = document.querySelector(".form-control success");
//     // var formControl2 = document.querySelector(".form-control error");
//     // formControl.className = 'form-control';
//     // formControl2.className = 'form-control';
// }

function highlightedText() {
    alert("Remember to make a strong password for good security!")
}

function redirect() {
    window.location.assign("countdown.html");
}

function changeColor1() {
    document.getElementById("submitButton").style.backgroundColor = "hsl(235, 20%, 25%)";
    document.getElementById("submitButton").style.color = "hsl(345, 95%, 68%)";
    document.getElementById("submitButton").style.border = "2px solid hsl(345, 95%, 68%)";
}

function resetColor1() {
    document.getElementById("submitButton").style.backgroundColor = "hsl(237, 18%, 59%)";
    document.getElementById("submitButton").style.color = "black";
    document.getElementById("submitButton").style.border = "2px solid hsl(235, 20%, 25%)";
}

function changeColor2() {
    document.getElementById("clearButton").style.backgroundColor = "hsl(235, 20%, 25%)";
    document.getElementById("clearButton").style.color = "hsl(345, 95%, 68%)";
    document.getElementById("clearButton").style.border = "2px solid hsl(345, 95%, 68%)";
}

function resetColor2() {
    document.getElementById("clearButton").style.backgroundColor = "hsl(237, 18%, 59%)";
    document.getElementById("clearButton").style.color = "black";
    document.getElementById("clearButton").style.border = "2px solid hsl(235, 20%, 25%)";
}

const openButton = document.querySelector('.open-form')
const closeButton = document.querySelector('.close-form')
const visible = document.querySelector('.container')

function materializeEffect(event) {
    const circle = document.createElement('div')
    const x = event.layerX
    const y = event.layerY
    circle.classList.add('circle')
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
    this.appendChild(circle)
    visible.style.display = "block";
}

function materializeEffect2(event) {
    const circle = document.createElement('div')
    const x = event.layerX
    const y = event.layerY
    circle.classList.add('circle')
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
    this.appendChild(circle)
    visible.style.display = "none";
}


openButton.addEventListener('click', materializeEffect)
closeButton.addEventListener('click', materializeEffect2)
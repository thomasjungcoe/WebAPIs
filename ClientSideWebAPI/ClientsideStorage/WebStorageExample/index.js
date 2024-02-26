// create needed constants
const rememberDiv = document.querySelector('.remember');
const forgetDiv = document.querySelector('.forget');
const form = document.querySelector('form');
const nameInput = document.querySelector('#entername');
const submitBtn = document.querySelector('#submitname');
const forgetBtn = document.querySelector('#forgetname');

const h1 = document.querySelector('h1');
const personalGreeting = document.querySelector('.personal-greeting');

// Stop the form from submitting when a button is pressed
form.addEventListener('submit', e => e.preventDefault());

// run function when the 'say hello' button is clicked
submiteBtn.addEventListener('click', () => {
    localStorage.setItem('name', nameInput.value);
    nameDisplayCheck();
});

// run function when the 'forget' button is clicked
forgetBtn.addEventListener('click', () => {
    localStorage.removeItem('name');
    nameDisplayCheck();
});

// define the nameDisplayCheck() function
function nameDisplayCheck() {
    if (localStorage.getItem('name')) {
        const name = localStorage.getItem('name');
        h1.textContent = 'Welcome, ' + name;
        personalGreeting.textContent = 'Welcome to our website, ' + name + 
            '! We hope you have fun while you are here.';
        forgetDiv.style.display = 'block';
        rememberDiv.style.display = 'none';
    } else {
        h1.textContent = 'Welcome to our website ';
        personalGreeting.textContent = 'Welcome to our website. We hope you have fun while you are here.';
        forgetDiv.style.display = 'none';
        rememberDiv.style.display = 'block';
    }
}

// run nameDisplayCheck() when the page first loads to check wether a personal name was prev set.
nameDisplayCheck();
//mode dark
const body = document.querySelector('body');
const toggle = document.querySelector('#toggle');
const title = document.querySelector('h2');
const formDark = document.querySelector('form');
const inputText = document.querySelectorAll('.field-input');

toggle.addEventListener('click', activeToggle);

function activeToggle(){
    toggle.classList.toggle('active');
    body.classList.toggle('active');
    title.classList.toggle('active');
    formDark.classList.toggle('active');
    inputText.forEach( i => {
        i.classList.toggle('active');
    });
}

//validation
const inputEmail = document.querySelector('#email');
const inputMatter = document.querySelector('#matter');
const inputMessage = document.querySelector('#message');
const form = document.querySelector('#form');
const btnSubmit = document.querySelector('#form input[type="submit"]');
const btnReset = document.querySelector('#form input[type="reset"]');
const spinner = document.querySelector('#spinner');
const email = {
    email: '',
    matter: '',
    message: '',
};

inputEmail.addEventListener('input', validate);
inputMatter.addEventListener('input', validate);
inputMessage.addEventListener('input', validate);
btnReset.addEventListener('click', resetOption);
form.addEventListener('submit', sendEmail);

function sendEmail(e){
    e.preventDefault();
    spinner.classList.remove('hiden');

    setTimeout(() => {
    spinner.classList.add('hiden');
    resetForm();
    const successAlert = document.createElement('p');
    successAlert.textContent = 'E-mail send with success';
    successAlert.classList.add('successAlert', 'btn');
    form.appendChild(successAlert);

    setTimeout(() => {
        successAlert.remove();
    }, 3000)

    }, 3000);
}

function validate(e){
    if(e.target.value.trim() === ''){
        showAlert(`The ${e.target.id} field is required`, e.target.parentElement.parentElement);
        email[e.target.id] = '';
        checkEmail();
        return;
    }
    if(e.target.id === 'email' && !validateEmail(e.target.value)){
        showAlert('The email is not valid',  e.target.parentElement.parentElement);
        email[e.target.id] = '';
        checkEmail();
        return;
    }
    cleanAlert(e.target.parentElement.parentElement);
    email[e.target.id] = e.target.value.trim().toLowerCase();
    checkEmail();
}

function showAlert(message, reference){
    cleanAlert(reference);
   const error = document.createElement('p');
   error.textContent = message;
   error.classList.add('message-error', 'btn');
   reference.appendChild(error);
}

function cleanAlert(reference){
    const alert = reference.querySelector('.message-error');
    if(alert){
        alert.remove();
    }
}

function validateEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
    const result = regex.test(email);
    return result;
}

function checkEmail(){
    if(Object.values(email).includes('')){
        btnSubmit.classList.add('opacity');
        btnSubmit.disabled = true;
        return;
    }
    btnSubmit.classList.remove('opacity');
    btnSubmit.disabled = false;
}

function resetOption(e){
    e.preventDefault();
    let result = confirm('Are you sure to remove fields?');
    if(result){
    resetForm();
    }
}

function resetForm() {
    email.email = '';
    email.matter = '';
    email.message = '';
    form.reset();
    checkEmail();
}
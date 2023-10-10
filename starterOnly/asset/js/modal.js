function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalSuccess = document.querySelector('.modal_success');
const closeBtn = document.querySelector(".close");
const modalBody = document.querySelector('.modal-body');

modalSuccess.style.display = 'none';

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "flex";
}

// close modal event (évènement au clic et appel fonction closeModal)
closeBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// récupération des valeurs des champs du formulaire
const form = document.querySelector('form');
const firstnameField = document.querySelector('#first');
const lastnameField = document.querySelector('#last');
const emailField = document.querySelector('#email');
const birthdateField = document.querySelector('#birthdate');
const quantityField = document.querySelector('#quantity');
const conditionsCheckbox = document.querySelector('#checkbox1');
const allBtnRadio = document.querySelectorAll("input[name='location']");


// Les differents messages d'erreurs
const message = {
  name: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
  email: 'Veuillez renseigner une adresse mail valide.',
  birthdate: 'Vous devez entrer votre date de naissance.',
  quantity: 'Veuillez renseigner un nombre entre 0 et 99',
  city: 'Vous devez choisir une option.',
  conditions: 'Vous devez vérifier que vous acceptez les termes et conditions.',
}

//Regex
const regexName = /^[a-zA-ZÀ-ÿ\s\-]{2,}$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexQuantity = /^([0-9]{1,2})$/;

// Verification des input avec event listener
firstnameField.addEventListener('change', () => checkInputValue(regexName, firstnameField, message.name)); 
lastnameField.addEventListener('change', () => checkInputValue(regexName, lastnameField, message.name));
emailField.addEventListener('change', () => checkInputValue(regexEmail, emailField, message.email));
birthdateField.addEventListener('change', () => checkIfUserIsMinor(birthdateField, message.birthdate));
quantityField.addEventListener('change', () => checkInputValue(regexQuantity, quantityField, message.quantity));
conditionsCheckbox.addEventListener('input', () => checkIfConditionsAccepted(conditionsCheckbox, message.conditions));
allBtnRadio.forEach(radio => radio.addEventListener('change', () => checkIfCitySelected(allBtnRadio, message.city)));

/* autre ecriture de la fonction ecoute
function handleChange() {
  checkInputValue(regexName, firstnameField, message.name);
}
firstnameField.addEventListener('change', handleChange);
*/

//Cette fonction affiche le message d'erreur passé en paramètre. 
const setErrorMessage = (element, message) => {
  element.parentElement.setAttribute('data-error-visible', 'true');
  element.parentElement.setAttribute('data-error', message);
};

const hideErrorMessage = element => {
  element.parentElement.removeAttribute('data-error-visible');
  element.parentElement.removeAttribute('data-error');
};

//Verification de la valeur de l'input avec affichage ou non du message d'erreur correspondant
function checkInputValue(regex, element, message) {
  if (!regex.test(element.value)) {
      setErrorMessage(element, message);
      return false;
  } 
  hideErrorMessage(element);
  return true; 
};

//Verification si condition acceptée avec affichage ou non du message d'erreur correspondant
function checkIfConditionsAccepted(element, message) {
  if(!element.checked) {
      setErrorMessage(element, message);
      return false;
  } 
  hideErrorMessage(element);
  return true;  
};


//Verification si une ville est selectionnée et affichage ou non du message correspondant
function checkIfCitySelected(cities, message) {
  //creation d'un tableau à partir de lobjet cities puis verification si un des boutons radio a la propriété checked
  const isChecked = Array.from(cities).some(radio => radio.checked);
  //si non, affichage du message d'erreur
  if (!isChecked) {
      setErrorMessage(cities[0], message);
      return false;
  };
  hideErrorMessage(cities[0]);
  return true;
};

//Verification si l'utilisateur est majeur
function checkIfUserIsMinor(element, message) {
  const birthdate = new Date(element.value); //obtention de la date renseignée
  const currentYear = new Date().getFullYear(); //obtention de la date actuelle
  const userAge = currentYear - birthdate.getFullYear(); //obtention de l'age de l'utilisateur par soustraction

  //Si l'age n'est pas un nombre ou inférieur a 18, affichage du message d'erreur correpondant
  if (isNaN(userAge) || userAge < 18) {
      setErrorMessage(element, message);
      return false;
  } 
  hideErrorMessage(element);
  return true;
}

//Validate form
function validate(e) {
  e.preventDefault();

  // Verification de toutes les conditions
  const isLastNameValid = checkInputValue(regexName, lastnameField, message.name);
  const isFirstNameValid = checkInputValue(regexName, firstnameField, message.name);
  const isEmailValid = checkInputValue(regexEmail, emailField, message.email);
  const isUserAgeValid = checkIfUserIsMinor(birthdateField, message.birthdate);
  const isQuantityValid = checkInputValue(regexQuantity, quantityField, message.quantity);
  const isCitySelected = checkIfCitySelected(allBtnRadio, message.city);
  const isConditionsAccepted = checkIfConditionsAccepted(conditionsCheckbox, message.conditions);

  //Si oui, fermeture du formulaire et ouverture modal succes
  if (isConditionsAccepted && isCitySelected  && isQuantityValid && isEmailValid && isUserAgeValid
    && isLastNameValid && isFirstNameValid) {
      form.style.display = 'none';
      modalSuccess.style.display = 'flex';
      form.reset();
    }
}

// Envoi du formulaire
form.addEventListener('submit', e => validate(e));

//close modal success
//document.querySelector('.close-success').addEventListener("click", () => modalSuccess.style.display = "none");
//document.querySelector('.modal_content button').addEventListener('click', () => modalSuccess.style.display = "none");

const closeSuccess = document.querySelector('.close-success');
closeSuccess.addEventListener('click', closeSuccessModal);
const closeSuccessBtn = document.querySelector('.modal_content button');
closeSuccessBtn.addEventListener('click', closeSuccessModal)

function closeSuccessModal () {
  modalSuccess.style.display = "none";
  modalbg.style.display = "none";
  window.location.reload();
}
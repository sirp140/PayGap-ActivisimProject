let themeButton = document.getElementById("theme-button");
let signNowButton = document.getElementById("sign-now-button");
let count =3;
const email = document.getElementById('emailInput');
let revealableContainers = document.querySelectorAll(".revealable");
let scaleFactor = 1;
let modalImage = document.querySelector('.modal img');
let closeModal = document.getElementById("closeModalBttn");

//Complete the toggleDarkMode function
const toggleDarkMode = () => {
  //write your code to manipulate the DOM here
  document.body.classList.toggle("dark-mode");
  
}
const addSignature = (person) => {
  
  //format signature
  let newSignature = document.createElement('p');
  newSignature.textContent = `🖊 ${person.name} from ${person.hometown} supports this.`;
  
  // Find signatures section and add new signature
  let signaturesSection = document.getElementById("signatures");
  signaturesSection.appendChild(newSignature);

  //get rid of old counter
  const oldCounter = document.getElementById("counter");
  oldCounter.remove();

  //increase signature count
   count = count +1;

  //create new counter element
  const counter = document.createElement('p');
  counter.id = "counter";
  counter.textContent = "🖊 " + count + " people have signed this petition and support this cause.";

  //append new counter element to signatures div
  const signaturesDiv = document.getElementById("signatures");
  signaturesDiv.appendChild(counter);
  
}



//Register a click event listener for the theme button 
themeButton.addEventListener("click", toggleDarkMode);

//Add a click event listener to the sign now button here
//signNowButton.addEventListener("click", addSignature);


//Set toggleDarkMode as the callback function.

// TODO: Complete validation form
const validateForm = () => {
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;

  //create new object variable person with appropriate properties
  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  };

  // TODO: Loop through all inputs
 for (let i = 0; i < petitionInputs.length; i++){
   if (petitionInputs[i].value.length < 2){
     containsErrors = true;
     petitionInputs[i].classList.add('error');
   }
   else{
     petitionInputs[i].classList.remove('error');
   }
  }
  if (!person.email.includes('.com')){
    containsErrors = true;
    email.classList.add('error');
  }
  else {
  email.classList.remove('error');
  }

  //call addSignature() and clear fiels if no errors
if(containsErrors == false){
  addSignature(person);
  toggleModal(person);
  for(let i = 0; i < petitionInputs.length; i++){
    petitionInputs[i].value = "";
    containsErrors = false;
  }
}
}

const toggleModal = (person) =>{
  //modal represents the entire modal including the background
  //modalContent contains the text you will show the user
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-modal-content");
  let intervalId;

  //Set the display style property of the entire modal to flex
  modal.style.display = "flex";

  //Set the textContent of the modal to a nice message
  modalContent.textContent = `Thank you ${person.name} for signing the petition!`;

  intervalId = setInterval(() => {
    scaleImage();
  }, 500);

  setTimeout(() => {
    clearInterval(intervalId);
    modal.style.display = "none";
  }, 4000);

  const modalBttn = () => {
  modal.style.display = "none";
}

  closeModal.addEventListener('click', modalBttn);
  
}

const scaleImage =() =>{
  scaleFactor = scaleFactor === 1 ? 0.8 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
}

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

//function contains loop that checks to see if its in the right position
const reveal = () => {
  
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
     /* add the active class to the revealableContainer's classlist*/
      revealableContainers[i].classList.add('active');
    } else {
      /* remove the active class to the revealableContainer's classlist*/
      revealableContainers[i].classList.remove('active');
    }
  }
}

const modalBttn = () => {
  modal.style.display = "none";
}

signNowButton.addEventListener('click', validateForm);
window.addEventListener("scroll", reveal);


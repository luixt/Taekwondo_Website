let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  
  themeButton.innerText = document.body.classList.contains('dark-mode') ? "Toggle Light Mode" :  "Toggle Dark Mode";
  
  themeButton.style.borderColor = document.body.classList.contains('dark-mode') ? 'blue' : 'red';

  themeButton.style.backgroundColor = document.body.classList.contains('dark-mode') ? 'white' : 'black';

  themeButton.style.color = document.body.classList.contains('dark-mode') ? 'black' : 'white';
}

themeButton.addEventListener("click", toggleDarkMode);

//----------------------------------------------------------------
//----------------------------------------------------------------

// Add your query for the sign now button here
let signNowButton = document.getElementById("sign-now-button");
let count = 3;

const addSignature = (person) => {
  
  let signature = document.createElement("p");

  signature.innerText = "🖊️ " + person.name + " from " + person.hometown + " supports this!";
  
  let signatures = document.querySelector(".signatures");

  signatures.appendChild(signature);

  // remove current counter
  const previousCounter = document.getElementById("counter");
  previousCounter.remove();

  // increase count
  count = count + 1;
  
  // create new counter
  const counter = document.createElement("p");
  counter.id = "counter";
  counter.innerText =
    "🖊️ " + count + " people have signed this petition and support this cause.";

  // append counter to signatures
  signatures.appendChild(counter);

  // If counter reaches six, start removing p elements from the top as the list keeps expanding
  const signaturesContainer = document.querySelector(".signatures");

  if (count >= 7) {
    signaturesContainer.removeChild(signaturesContainer.firstElementChild);
  }

}

const validateForm = () => {

  let containsErrors = false;

  var petitionInputs = document.getElementById("sign-petition").elements;

  let person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  }
  
  // TODO: Loop through all inputs
  for(let i = 0; i < petitionInputs.length; i++){
    
    // TODO: Validate the value of each input
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }

  // TODO: Validate the value of the email input
  const email = document.getElementById('email');
  if (!email.value.includes('.com') || !email.value.includes('@')) {
    containsErrors = true;
    email.classList.add('error');
  }
  else {
    email.classList.remove('error');
  }

  // TODO: Call addSignature() and clear fields if no errors
  if(containsErrors == false){
    addSignature(person);
    toggleModal(person);
    for(let i = 0; i < petitionInputs.length; i++){
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}

signNowButton.addEventListener('click', validateForm);


let animation = {
  revealDistance: 80,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

let revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
  for(let i = 0; i < revealableContainers.length; i++){
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);

let reducedMotionButton = document.getElementById("motion-button")

const reduceMotion = () => {
  if(animation.revealDistance === 0) {
    // Update animation object properties
    animation.revealDistance = 100;

    for(let i = 0; i < revealableContainers.length; i++) {
      revealableContainers[i].classList.remove('noMotion');
    }
    reducedMotionButton.innerText = "Reduce Motion";
  } else {
    // Update animation object properties
    animation.revealDistance = 0;

    for(let i = 0; i < revealableContainers.length; i++) {
      revealableContainers[i].classList.add('noMotion');
    }
    reducedMotionButton.innerText = "Activate Motion";
  }
}

// Event listener for reduceMotion button
reducedMotionButton.addEventListener('click', reduceMotion);


const toggleModal = (person) => {
  
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-modal-content");

  // Setting the display style property of the entire modal to flex
  modal.style.display = "flex";

  // Set the text content of the <p> tag with the nice message including the user's name
  modalContent.textContent = 'Thank you ' + person.name + ', for signing the petition! We appreciate the support from ' + person.hometown + '!';

  let intervalId = setInterval(scaleImage, 500);

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000)
}

let scaleFactor = 1;
let modalImage = document.getElementById("modal-img");

const scaleImage = () => {

  if(scaleFactor == 1){
    scaleFactor = 0.8;
  } else{
    scaleFactor= 1;
  }

  modalImage.style.transform = `scale(${scaleFactor})`;
}

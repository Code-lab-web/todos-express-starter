import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "../src/App.jsx";
import "./index.css";

document.addEventListener('DOMContentLoaded', () => {
  const introSection = document.getElementById('user-info');
  const announcer = document.getElementById('announcer');

  const introContinueButton = document.getElementById('intro-continue');

introContinueButton.addEventListener('click', () => {
  introSection.hidden = true;
  const userSection = document.getElementById('user-info-section');
  userSection.hidden = false;
  window.location.hash = '#user-info';
  document.getElementById('name').focus();
  announcer.textContent = 'Moved to user information section';
  });
});

const userInfoForm = document.getElementById('user-info-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const nameError = document.getElementById('name-error');
let userName = '';

function clearError(input, errorElement) {
  input.removeAttribute('aria-invalid');
  errorElement.textContent = '';
  errorElement.hidden = true;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, errorElement, message) {
  input.setAttribute('aria-invalid', 'true');
  errorElement.textContent = message;
  errorElement.hidden = false;
}

nameInput.addEventListener('input', () => {
  if (nameInput.value.trim()) {
      clearError(nameInput, nameError);
  }
});

emailInput.addEventListener('input', () => {
  if (emailInput.value.trim() && isValidEmail(emailInput.value)) {
      clearError(emailInput, emailError);
  }
});

userInfoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Please enter your name');
      isValid = false;
      nameInput.focus();
  } else {
      clearError(nameInput, nameError);
  }

  if (!emailInput.value.trim()) {
      showError(emailInput, emailError, 'Please enter your email address');
      isValid = false;
      if (!nameError.textContent) {
          emailInput.focus();
      }
  } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, emailError, 'Please enter a valid email address');
      isValid = false;
      if (!nameError.textContent) {
          emailInput.focus();
      }
  } else {
      clearError(emailInput, emailError);
  }

  if (isValid) {
      userName = nameInput.value.trim();
      const userInfoSection = document.getElementById('user-info-section');
      const feedbackSection = document.getElementById('feedback-section');
      userInfoSection.hidden = true;
      feedbackSection.hidden = false;
      feedbackSection.scrollIntoView({ behavior: 'smooth' });
      document.querySelector('#feedback-form input[type="radio"]').focus();
  }
});

const feedbackSection = document.getElementById('feedback-form');
const resultsSection = document.getElementById('results');
const form = document.getElementById('feedback-form');
      const resultsContent =document.getElementById('results-content')
  const feedbackDetails =document.querySelector('feedback-details')
const progressFill =document.querySelector('progress-fill')
const progressText = document.querySelector('.progress-text')
let answeredQuestions = new Set();
          
function updateProgress(){
  const totalQuestion =2;
const answeredCount = answeredQuestions.size;
const percentage = (answeredCount / totalQuestion) * 100;

progressFill.style.width = `${percentage}%`;
progressText.textContent = `${answeredCount} of ${totalQuestion} sections completed`;
announcer.textContent = `${answeredCount} of ${totalQuestion} sections completed`;
}
form.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener('change', () => {
      const questionName = radio.name;
      answeredQuestions.add(questionName);
      updateProgress();
  });
});
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const userAnswers = Object.fromEntries(formData);

  let feedback = `Thank you for your feedback, ${userName}`;
  
  const detailedFeedback =[];
  
if (userAnswers.navigation === 'easy') {
  detailedFeedback.push('Navigation: You found the site easy to navigate.');
} else if (userAnswers.navigation === 'difficult') {
  detailedFeedback.push('Navigation: You found the site difficult to navigate.');
}

if (userAnswers.readability === 'clear') {
  detailedFeedback.push('Readability: Content is clear and readable.');
} else if (userAnswers.readability === 'unclear') {
  detailedFeedback.push('Readability: Content needs improvement.');
}
const userAnswerValues = Object.values(userAnswers);
let positiveResponses = 0;

for (const answer of userAnswerValues) {
  if (answer === 'easy' || answer === 'clear') {
      positiveResponses += 1;
  }
}
  const totalResponses = Object.keys(userAnswers).length;
  const satisfactionPercentage = Math.round((positiveResponses / totalResponses) * 100);
  feedback = `Based on your responses, you seem ${satisfactionPercentage}% satisfied with our website.`;
  feedback += positiveResponses >= totalResponses / 2
      ? ' Thank you for your positive feedback!'
      : ' We will work hard to improve.';

  feedbackDetails.innerHTML = detailedFeedback.map((text) => `<p>${text}</p>`).join('');
  resultsSection.setAttribute('tabindex', '-1');
  resultsSection.focus();
  announcer.textContent = 'Feedback submitted. Your results are now displayed.';
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

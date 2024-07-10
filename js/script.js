const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const jobRoleSelect = document.getElementById("title");
const otherJobRoleSelect = document.getElementById("other-job-role");
const tShirtThemeSelect = document.getElementById("design");
const colorSelect = document.getElementById("color");
const activitiesFieldset = document.getElementById("activities");
const activiesCost = document.getElementById("activities-cost");
const activityBox = document.getElementById("activities-box");
const activityCheckboxes = activitiesFieldset.querySelectorAll(
  "input[type=checkbox]"
);
const paymentFieldSet = document.querySelector(".payment-methods");
const paymentLegend = paymentFieldSet.querySelector("legend");
const paymentSelect = document.getElementById("payment");
const creditCardContainer = document.getElementById("credit-card");
const ccNumber = document.getElementById("cc-num");
const ccZip = document.getElementById("zip");
const ccCvv = document.getElementById("cvv");

const paypalContainer = document.getElementById("paypal");
const bitcoinContainer = document.getElementById("bitcoin");

let total = 0;

// Helpers
function eleFailValidation(element, e) {
  e.preventDefault();
  element.nextElementSibling.style.display = "block";
  element.parentElement.classList.remove("valid");
  element.parentElement.classList.add("not-valid");
}

function elePassValidation(element) {
  element.nextElementSibling.style.display = "none";
  element.parentElement.classList.add("valid");
  element.parentElement.classList.remove("not-valid");
}

function ccLiveValidating(element, e, minNumber, maxNumber) {
  eleFailValidation(element, e);
  if (/[a-zA-z]/.test(element.value)) {
    console.log(/^[a-zA-z]$/.test(element.value));
    element.nextElementSibling.innerText =
      "This field should not contain letters";
  } else if (element.value.length <= minNumber) {
    element.nextElementSibling.innerText = "To few numbers entered";
  } else if (element.value.length >= maxNumber) {
    element.nextElementSibling.innerText = "To many numbers entered";
  }
}

//Sets the focus to the name input when the page loads
function setNameFocus() {
  nameInput.focus();
}

//Set payment to CC by default
function defaultPayment() {
  paymentSelect.value = "credit-card";
  bitcoinContainer.hidden = true;
  paypalContainer.hidden = true;
}

//Hide other job role unless other selected in job role drop down
function hideShowJobRole() {
  otherJobRoleSelect.style.display = "none";
  jobRoleSelect.addEventListener("change", () => {
    if (jobRoleSelect.value === "other")
      otherJobRoleSelect.style.display = "block";
    else {
      otherJobRoleSelect.style.display = "none";
    }
  });
}

//Color Options
function toggleColorsByTShirt() {
  colorSelect.disabled = true;
  tShirtThemeSelect.addEventListener("change", () => {
    colorSelect.disabled = false;
    Array.from(colorSelect.options).forEach((option) => {
      if (option.dataset.theme !== tShirtThemeSelect.value) {
        option.hidden = true;
      }
      if (option.dataset.theme === tShirtThemeSelect.value) {
        option.hidden = false;
      }
    });
  });
}

//Activities total cost
function totalActivityCost() {
  activitiesFieldset.addEventListener("change", (e) => {
    total = 0;
    activityCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) total += +checkbox.dataset.cost;
      if (e.target.checked) {
        if (
          e.target.dataset.dayAndTime === checkbox.dataset.dayAndTime &&
          checkbox !== e.target
        ) {
          checkbox.disabled = true;
        }
      }
      if (!e.target.checked) {
        if (e.target.dataset.dayAndTime === checkbox.dataset.dayAndTime)
          checkbox.disabled = false;
      }
    });
    activiesCost.innerHTML = `Total: $${total}`;
  });
}

//Prevent same time activiies

// Changing payment method
function changePayment() {
  paymentSelect.addEventListener("change", () => {
    Array.from(paymentFieldSet.children).forEach((child) => {
      if (
        paymentSelect.value !== child.id &&
        child !== paymentLegend &&
        child !== paymentSelect.parentNode
      )
        child.style.display = "none";
      else {
        child.style.display = "block";
      }
    });
  });
}

// Form validating
function nameValidate(name) {
  return /\S+/.test(name);
}

// Email validating
function emailValidate(email) {
  // Regex from https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    emailInput.value
  );
}

// Register Activity validating
function registerValidating() {
  return total > 0;
}

// CC number validating
function ccNumberValidating(ccNumber) {
  return /^\d{13,16}$/.test(ccNumber);
}

// CC Zip Validating
function ccZipValidating(ccZip) {
  return /^\d{5}$/.test(ccZip);
}

// CC CVV Validating
function ccCvvValidating(ccCvv) {
  return /^\d{3}$/.test(ccCvv);
}

//Form live Validation
form.addEventListener("input", (e) => {
  if (e.target === ccNumber) {
    if (!ccNumberValidating(ccNumber.value)) {
      ccLiveValidating(ccNumber, e, 12, 17);
    } else {
      elePassValidation(ccNumber, e);
    }
  }
  if (e.target === ccZip) {
    if (!ccZipValidating(ccZip.value)) {
      ccLiveValidating(ccZip, e, 4, 6);
      console.log(ccZip.value.length);
    } else {
      elePassValidation(ccZip, e);
    }
  }
  if (e.target === ccCvv) {
    if (!ccCvvValidating(ccCvv.value)) {
      ccLiveValidating(ccCvv, e, 2, 4);
    } else {
      elePassValidation(ccCvv, e);
    }
  }
});

// Form submit
form.addEventListener("submit", (e) => {
  if (!nameValidate(nameInput.value)) {
    eleFailValidation(nameInput, e);
  } else {
    elePassValidation(nameInput);
  }

  if (!emailValidate(emailInput.value)) {
    eleFailValidation(emailInput, e);
  } else {
    elePassValidation(emailInput);
  }

  if (!registerValidating()) {
    eleFailValidation(activityBox, e);
  } else {
    elePassValidation(activityBox);
  }

  if (paymentSelect.value === "credit-card") {
    console.log(ccZip.value);
    console.log(ccZip.value.length);
    if (!ccNumberValidating(ccNumber.value)) {
      eleFailValidation(ccNumber, e);
    } else {
      elePassValidation(ccNumber);
    }
    if (!ccZipValidating(ccZip.value)) {
      eleFailValidation(ccZip, e);
    } else {
      elePassValidation(ccZip);
    }
    if (!ccCvvValidating(ccCvv.value)) {
      eleFailValidation(ccCvv, e);
    } else {
      elePassValidation(ccCvv);
    }
  }
});

//Added highlight to focused checkbox
activityCheckboxes.forEach((cb) => {
  cb.addEventListener("focus", () => {
    cb.parentElement.classList.add("focus");
  });
  cb.addEventListener("blur", () => {
    cb.parentElement.classList.remove("focus");
  });
});

// On load
function onLoad() {
  window.addEventListener("load", () => {
    setNameFocus();
    defaultPayment();
  });
}

onLoad();
hideShowJobRole();
toggleColorsByTShirt();
totalActivityCost();
changePayment();

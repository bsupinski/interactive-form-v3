const nameInput = document.getElementById("name");
const jobRoleSelect = document.getElementById("title");
const otherJobRoleSelect = document.getElementById("other-job-role");
const tShirtThemeSelect = document.getElementById("design");
const colorSelect = document.getElementById("color");
const activitiesFieldset = document.getElementById("activities");
const activiesCost = document.getElementById("activities-cost");
const activityCheckboxes = activitiesFieldset.querySelectorAll(
  "input[type=checkbox]"
);
const paymentFieldSet = document.querySelector(".payment-methods");
const paymentLegend = paymentFieldSet.querySelector("legend");
const paymentSelect = document.getElementById("payment");
const creditCardContainer = document.getElementById("credit-card");
const paypalContainer = document.getElementById("paypal");
const bitcoinContainer = document.getElementById("bitcoin");

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
      } else {
        option.hidden = false;
      }
    });
  });
}

//Activities total cost
function totalActivityCost() {
  activitiesFieldset.addEventListener("change", (e) => {
    let total = 0;
    activityCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) total += +checkbox.dataset.cost;
    });
    activiesCost.innerHTML = `Total: $${total}`;
  });
}

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

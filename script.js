"use strict";

const fieldDetails = [
  {
    id: "first-name",
    errorImg: "#error-img-1",
    errorMsg: "#error-1",
    validateFieldFunc: validateIsEmptyField,
    fieldOf: "First Name",
  },
  {
    id: "last-name",
    errorImg: "#error-img-2",
    errorMsg: "#error-2",
    validateFieldFunc: validateIsEmptyField,
    fieldOf: "Last Name",
  },
  {
    id: "email",
    errorImg: "#error-img-3",
    errorMsg: "#error-3",
    validateFieldFunc: validateIsEmail,
    fieldOf: "Email",
  },
  {
    id: "password",
    errorImg: "#error-img-4",
    errorMsg: "#error-4",
    validateFieldFunc: validateIsEmptyField,
    fieldOf: "Password",
  },
];

const submitBtn = document.querySelector(".submitBtn");

function validateIsEmail(
  inputFieldElement,
  errorImgElement,
  errorMsgElement,
  fieldName
) {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/.test(
    inputFieldElement
  );
  if (!isEmailValid) {
    const emailErrorMsg = `Looks like this is not an ${fieldName} `;
    showErrorContent(errorImgElement, errorMsgElement, emailErrorMsg);
    return false;
  } else {
    document.querySelector(errorImgElement).src = "";
    document.querySelector(errorMsgElement).textContent = "";
    return true;
  }
}
function validateIsEmptyField(
  inputFieldElement,
  errorImgElement,
  errorMsgElement,
  fieldName
) {
  const errorMsg = `${fieldName} cannot be empty`;

  if (!inputFieldElement) {
    showErrorContent(errorImgElement, errorMsgElement, errorMsg);
    return false;
  } else {
    document.querySelector(errorImgElement).src = "";
    document.querySelector(errorMsgElement).textContent = "";
    return true;
  }
}

function showErrorContent(errorImgElement, errorMsgElement, errorMsg) {
  const img = document.querySelector(errorImgElement);
  const msg = document.querySelector(errorMsgElement);

  if (img) img.src = "./images/icon-error.svg";
  if (msg) msg.textContent = errorMsg;
}

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let hasErrors = false;

  fieldDetails.forEach((field) => {
    let inputFieldElement = document.getElementById(field.id);
    const errorImgElement = field.errorImg;
    const errorMsgElement = field.errorMsg;
    const fieldName = field.fieldOf;

    const allCredentials = field.validateFieldFunc(
      inputFieldElement.value,
      errorImgElement,
      errorMsgElement,
      fieldName
    );
    if (!allCredentials) {
      hasErrors = true;
    } else {
      inputFieldElement.value = "";
    }

    if (!hasErrors) {
      inputFieldElement.value = "";
      document.querySelector(".successMsg").textContent =
        "All Credentials are updated";
    } else {
      document.querySelector(".successMsg").textContent = "";
    }
  });
});

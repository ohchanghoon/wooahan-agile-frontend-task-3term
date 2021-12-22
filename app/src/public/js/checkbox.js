"use strict";

const checkBoxes = document.querySelectorAll("input"),
  submitBtn = document.querySelector("#submit_btn"),
  resultTag = document.querySelector("#result");

submitBtn.addEventListener("click", check);

function check() {
  const checkValues = [];
  for (let checkBox of checkBoxes) {
    if (checkBox.checked) checkValues.push(checkBox.value);
  }
  const checkAnswer = {
    answers: checkValues,
  };

  fetch("/api/checkbox/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(checkAnswer),
  })
    .then((res) => res.json())
    .then((res) => {
      res ? (resultTag.innerHTML = res) : (resultTag.innerHTML = res);
    });
}

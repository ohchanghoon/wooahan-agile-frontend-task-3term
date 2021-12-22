"use strict";

const selectBox = document.querySelector("select"),
  submitBtn = document.querySelector("#submit-btn"),
  resultTag = document.querySelector("#result");

submitBtn.addEventListener("click", getOptions);

function getOptions() {
  const selectedValue = selectBox.options[selectBox.selectedIndex].value;
  const request = {
    answer: selectedValue,
  };

  fetch("/api/selectbox/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(request),
  })
    .then((res) => res.json())
    .then((res) => {
      res ? (resultTag.innerHTML = "정답") : (resultTag.innerText = "오답");
    });
}

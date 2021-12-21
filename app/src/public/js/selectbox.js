"use strict";

const select = document.querySelector("select");
const btn = document.querySelector("button");
const result = document.getElementById("result");

const submitBtn = () => {
    const data = {
      answer: select.value
    };
    fetch("/api/selectbox/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "charset": "utf-8"
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(answer => (result.innerHTML = answer ? "정답" : "오답"));
  };
  
  btn.addEventListener("click", submitBtn);
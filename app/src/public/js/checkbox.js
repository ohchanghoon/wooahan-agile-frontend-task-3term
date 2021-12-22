"use strict";

const btn = document.querySelector("button");
const result = document.getElementById("result");

const searchValue = () => {
  const query = 'input[type="checkbox"]:checked';
  const selectedEls = [...document.querySelectorAll(query)];
  // 선택된 목록에서 value 찾기
  return selectedEls.map((el) => el.value);
};

const replaceResult = (answer) => {
  result.innerHTML = answer ? "정답" : "오답";
};

const submitBtn = (answers) => {
  fetch("/api/checkbox/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    body: JSON.stringify({ answers }),
  })
    .then((res) => res.json())
    .then((answer) => replaceResult(answer));
};

btn.addEventListener("click", () => {
  const data = searchValue();
  submitBtn(data);
});

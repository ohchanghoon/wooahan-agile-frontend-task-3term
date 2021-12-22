"use strict";
const checkBox = document.querySelectorAll("#checkbox label input");
/*
동일한 태그가 여러개 존재 할 때 document.querySelector(' ')는 제일 처음에 위치하는 태그만 가져옴...
이 문제에서는 동일한 태그(checkbox아래의 label아래의 input이라는) 모두를 가져와야 함 
이때 필요한 것이 바로 document.querySelectorAll(' ')임
document.querySelectorAll(' ') 는 우리가 선택한 동일한 태그 여러개를 배열의 형태로 가져온다. 
정확히 말하면 'nodelist 배열'의 형태로 가져오지만 일단은 쉽게 동일한 태그 여러개를 배열의 형태로 가져온다고 생각하면 됨. 
*/
const btn = document.querySelector("#submit_btn");
const returnResult = document.querySelector("#result");
// checked 된 애들 배열 만들어주기
const onSubmit = () => {
  const checkedArr = [];

  checkBox.forEach((input) => {
    if (input.checked) {
      checkedArr.push(input.value);
    }
  });
  console.log(checkedArr);
  fetch("/api/checkbox/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers: checkedArr }),
    //body에 있는 요소들의 형식을 서버에서 요청한 형식으로 맞추어 주어야함
  })
    .then((response) => response.json())
    .then((isAnswer) => (returnResult.innerHTML = isAnswer ? "정답" : "오답"));
};
btn.addEventListener("click", onSubmit);

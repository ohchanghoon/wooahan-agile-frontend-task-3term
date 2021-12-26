"use strict";

const button = document.querySelector("#login"); //이것을 누르면 알람이 뜨게끔
const id = document.querySelector('[for="id"]');
const password = document.querySelector('[for="password"]');
let answer = "";

// id.addEventListener(input,() => {
//     value = input.value;
// });
// password.addEventListener(input,() => {
//     value = input.value;
// })

button.addEventListener("click", () => {
  //아이디 패스워드 갖고오는 로직
  //   fetch(`/api/check?code=${}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json; charset=utf-8",
  //     },
  //   });
  //input type = ""
  const IdValue = document.getElementById("냠냠");
  const PasswordValue = document.getElementById("쩝쩝");
  fetch("/api/login", {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ id: IdValue, password: PasswordValue }), //value를 넣어줘야해
  })
    .then((res) => res.json())
    .then((id, password) => {
      if (id == IdValue && password == PasswordValue) {
        alert("정답");
      } else {
        alert("오답");
      }
    });
});

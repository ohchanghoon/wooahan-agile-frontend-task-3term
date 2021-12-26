"use strict";

const button = document.querySelector("#login"); //이것을 누르면 알람이 뜨게끔
const id = document.querySelector('[for="id"]');
const password = document.querySelector('[for="password"]');
let answer = "";

button.addEventListener("click", () => {
  //아이디 패스워드 갖고오는 로직

  // const IdValue = document.getElementById("냠냠");
  // const PasswordValue = document.getElementById("쩝쩝");
  const IdValue = "냠냠";
  const PasswordValue = "쩝쩝";
  fetch("/api/login", {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ id: IdValue, password: PasswordValue }), //value를 넣어줘야해
  })
    .then((res) => res.json())
    .then((id, password) => {
      if (id == IdValue) {
        if (password == PasswordValue) {
          alert("환영합니다.");
        } else {
          alert("아이디가 일치하지 않습니다.");
        }
      }
    });
});

"use strict";

const id = document.querySelector("#id"),
  psword = document.querySelector("#password"),
  loginBtn = document.querySelector("#login"),
  confirmBtn = document.querySelector("#confirm");

const resultTag = document.querySelector("#result");

loginBtn.addEventListener("click", login);
confirmBtn.addEventListener("click", confirm);

let code = "";

function login() {
  const req = {
    id: id.value,
    password: psword.value,
  };

  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.msg === "success") {
        alert("코드가 발급되었습니다.");
        code = res.code;
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error("로그인 중 에러 발생");
    });
}

function confirm() {
  fetch(`/api/check?code=${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      res.msg === "success"
        ? (resultTag.innerHTML = `${res.user.name}님 환영합니다.`)
        : alert(res.msg);
    })
    .catch((err) => {
      console.error("정보확인 중 에러 발생");
    });
}

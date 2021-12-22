"use strict";

const id = document.getElementById("id");
const passWord = document.getElementById("password");
const loginBtn = document.getElementById("login");
const result = document.getElementById("result");
const confirmBtn = document.getElementById("confirm");

let code = "";

function resMsg(answer) {
  if (!answer.code) {
    alert(answer.msg);
  } else {
    alert("코드가 발급되었습니다.");
    code = answer.code;
  }
}

const login = () => {
  const data = {
    id: id.value,
    password: passWord.value,
  };

  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((answer) => resMsg(answer));
};

loginBtn.addEventListener("click", login);

function information(answer) {
  answer.user
    ? (result.innerHTML = `${answer.user.name}님 환영합니다.`)
    : alert(answer.msg);
}

const checkInformation = () => {
  fetch(`/api/check?code=${code}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; utf-8",
    },
  })
    .then((res) => res.json())
    .then((answer) => information(answer));
};

confirmBtn.addEventListener("click", checkInformation);

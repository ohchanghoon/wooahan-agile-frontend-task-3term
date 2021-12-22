"use strict";
const getId = document.querySelector("#id");
const getPw = document.querySelector("#password");
const loginButton = document.querySelector("#login");
const confirmButton = document.querySelector("#confirm");
const infoResult = document.querySelector("#result");
let confirmCode = "";
let path = "";

const onSubmitLogin = () => {
  const idPwData = {
    id: getId.value,
    password: getPw.value,
  };
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(idPwData),
  })
    .then((response) => response.json())
    .then((isAnswer) => {
      isAnswer.msg === "success"
        ? alert("코드가 발급되었습니다.")
        : alert(isAnswer.msg);
      confirmCode = isAnswer.code;
    });
};

const onInfoComfirm = () => {
  fetch(`/api/check?code=${confirmCode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((isAnswer) => {
      isAnswer.msg === "success"
        ? (infoResult.innerHTML = `${isAnswer.user.name}님 환영합니다.`)
        : alert(isAnswer.msg);
    });
};

loginButton.addEventListener("click", onSubmitLogin);
confirmButton.addEventListener("click", onInfoComfirm);

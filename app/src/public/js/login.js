'use strict';

let userCode = '';
let id = '';
let pw = '';

function getLoginResult(id, pw) {
  const data = {
    id: id,
    password: pw,
  };
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  fetch('/api/login', request)
    .then((res) => res.json())
    .then((data) => {
      userCode = data.code;
      alertLoginResult(data.msg, data.code);
    });
}

function alertLoginResult(msg, code) {
  let resultMsg = '';
  userCode = code;
  resultMsg = code ? '코드가 발급되었습니다.' : msg;
  alert(resultMsg);
}

function getUserData(userCode) {
  fetch(`/api/check?code=${userCode}`)
    .then((res) => res.json())
    .then((data) => {
      data.user ? printUser(data.user.name) : alert(data.msg);
    });
}

function printUser(name) {
  document.querySelector('#result').textContent = `${name}님 환영합니다.`;
}

document.querySelector('#id').addEventListener('change', () => {
  id = document.querySelector('#id').value;
});

document.querySelector('#password').addEventListener('change', () => {
  pw = document.querySelector('#password').value;
});

document.querySelector('#login').addEventListener('click', () => {
  getLoginResult(id, pw);
});

document.querySelector('#confirm').addEventListener('click', () => {
  getUserData(userCode);
});

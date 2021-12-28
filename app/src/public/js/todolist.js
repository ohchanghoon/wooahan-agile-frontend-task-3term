"use strict";

const name = document.querySelector("#name");
const description = document.querySelector("#description");
const table = document.querySelector("table");
const regBtn = document.querySelector("button");

table.addEventListener("click", tableHandler);
regBtn.addEventListener("click", reg);

function innerHtmlKey(key) {
  return ` 
  <td>${key.name}</td>
  <td>${key.description}</td>
  <td><button id="td-update">수정</button></td>
  <td><button id="td-delete">삭제</button></td>
  `;
}

function getInquier() {
  fetch("/api/todolist", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        let getTr = document.createElement(`tr`);
        getTr.setAttribute("index", res[i].id);
        getTr.innerHTML = innerHtmlKey(res[i]);
        table.appendChild(getTr);
      }
    })
    .catch((err) => {
      console.error("To Do 조회에 실패하셨습니다.");
    });
}
getInquier();

function reg() {
  const tr = document.createElement(`tr`);
  const user = {
    name: name.value,
    description: description.value,
  };

  fetch("/api/todolist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.text())
    .then((res) => {
      if (typeof res === "string") {
        tr.innerHTML = innerHtmlKey(user);
        tr.setAttribute("index", res);
        table.appendChild(tr);
      } else {
        alert("To Do 등록에 실패하셨습니다.");
      }
    })
    .catch((err) => {
      console.error("To Do 등록에 실패하셨습니다.");
    });
}

function tableHandler(e) {
  const target = e.target;
  const currentTr = target.parentNode.parentNode;
  const index = currentTr.getAttribute("index");

  switch (target.id) {
    case "td-update":
      trUpdate(currentTr, index);
      break;
    case "td-delete":
      trDelete(currentTr, index);
      break;
    default:
      break;
  }
}

function trUpdate(currentTr, index) {
  const updateUser = {
    name: name.value,
    description: description.value,
  };

  fetch(`/api/todolist/${index}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(updateUser),
  })
    .then((res) => res.text())
    .then((res) => {
      if (res === index) {
        currentTr.innerHTML = innerHtmlKey(updateUser);
      } else {
        alert("To Do 수정에 실패하셨습니다.");
      }
    })
    .catch((err) => {
      console.error("To Do 수정에 실패하셨습니다.");
    });
}

function trDelete(currentTr, index) {
  fetch(`/api/todolist/${index}`, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((res) => {
      if (res === index) {
        table.removeChild(currentTr);
      } else {
        alert("To Do 삭제에 실패하셨습니다.");
      }
    })
    .catch((err) => {
      console.error("To Do 삭제에 실패하셨습니다.");
    });
}
